# server/services/chat_manager.py

from fastapi import WebSocket, WebSocketDisconnect
from starlette.websockets import WebSocketState
from typing import List, Dict
import logging, random, asyncio, json
from sqlalchemy.orm import Session
from sqlalchemy import func
from database.database import SessionLocal
from database.models import Message, ChatSession

class ChatManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.db = SessionLocal()

    async def connect(self, websocket: WebSocket):
        try:
            await websocket.accept()
            self.active_connections.append(websocket)
            logging.info(f"WebSocket connection established. Total connections: {len(self.active_connections)}")
        except WebSocketDisconnect:
            logging.error("WebSocket disconnected during connection attempt.")
            await websocket.close()
        except Exception as e:
            logging.error(f"Error connecting to WebSocket: {e}")
            await websocket.close()

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            logging.info("WebSocket disconnected.")
        else:
            logging.warning("WebSocket not found in active connections on disconnect.")

    async def send_message(self, message: str, websocket: WebSocket):
        if websocket.client_state == WebSocketState.CONNECTED:
            try:
                await websocket.send_text(message)
                logging.info("Message sent successfully.")
            except WebSocketDisconnect:
                logging.error("WebSocket disconnected during message send.")
                self.disconnect(websocket)
            except Exception as e:
                logging.error(f"Error sending message: {e}")
                self.disconnect(websocket)
        else:
            logging.warning("Attempted to send a message to an inactive or closed WebSocket.")
            self.disconnect(websocket)

    async def broadcast(self, message: str):
        for connection in list(self.active_connections):  # Use a copy of the list to manage changes during iteration
            await self.send_message(message, connection)

    async def mock_chatgpt_stream_response(self, input_text):
        # Simulate processing input text and generating a response in chunks
        words = input_text.split()
        accumulated_response = ""
        for i in range(1, 101):  # Simulating a count to 100 as your example
            chunk = f"{i}, "
            accumulated_response += chunk
            is_final = i == 100
            await asyncio.sleep(0.05)  # Simulate processing time
            yield (chunk, is_final, accumulated_response if is_final else None)

    async def handle_new_message(self, data: Dict, websocket: WebSocket):
        action = data.get("action")
        if not action:
            await self.send_message("Error: No action provided", websocket)
            return

        if action == "create":
            session_id = data.get("session_id")
            content = data.get("content")
            user_id = data.get("user_id", 1)  # Default to user_id 1 if not provided
            llm_id = data.get("llm_id")

            if not content:
                await self.send_message("Error: Missing content", websocket)
                return

            if not session_id:
                session = ChatSession()
                self.db.add(session)
                self.db.commit()
                session_id = session.id
                logging.info(f"New session created with ID: {session_id}")
            else:
                session = self.db.query(ChatSession).filter(ChatSession.id == session_id).first()
                if not session:
                    await self.send_message(f"Error: Session with ID {session_id} not found", websocket)
                    return

            # Add the new user message
            new_message = Message(chat_session_id=session_id, content=content, user_id=user_id)
            self.db.add(new_message)
            self.db.commit()

            # Send the user message to the client
            await self.send_message(json.dumps({
                "content": content,
                "type": "user_message",
                "user_id": user_id,
                "session_id": session_id,
                "is_final": True
            }), websocket)

            # Generate and send the mock LLM response
            async_generator = self.mock_chatgpt_stream_response(content)
            accumulated_response = ""
            try:
                async for chunk, is_final, full_response in async_generator:
                    accumulated_response += chunk
                    llm_message = {
                        "content": chunk,
                        "type": "llm_response",
                        "is_final": is_final,
                        "session_id": session_id,
                        "llm_id": llm_id
                    }
                    await self.send_message(json.dumps(llm_message), websocket)

                    # Save the LLM response to the database only when complete
                    if is_final and full_response is not None:
                        llm_message_db = Message(chat_session_id=session_id, content=full_response, user_id=None, llm_id=llm_id)
                        self.db.add(llm_message_db)
                        self.db.commit()
                        break
            except Exception as e:
                logging.error(f"Error during message streaming: {e}")

    async def process_message(self, data: Dict, websocket: WebSocket):
        await self.handle_new_message(data, websocket)

    def get_chat_sessions(self):
        chat_sessions = self.db.query(ChatSession).all()
        return chat_sessions

    def get_messages(self, session_id: int):
        print("\n\n\nget_messages called with session_id: ", session_id, "\n\n\n")
        messages = self.db.query(Message).filter(Message.chat_session_id == session_id).all()
        return messages

    def get_chat_sessions_with_first_message(self):
        subquery = self.db.query(
            Message.chat_session_id,
            func.min(Message.id).label("first_message_id")
        ).group_by(Message.chat_session_id).subquery()

        query = self.db.query(
            ChatSession,
            Message.content.label("first_message_content")
        ).join(
            subquery,
            ChatSession.id == subquery.c.chat_session_id
        ).join(
            Message,
            subquery.c.first_message_id == Message.id
        )

        results = query.all()
        return [(session, first_message_content) for session, first_message_content in results]
