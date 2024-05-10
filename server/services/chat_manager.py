from fastapi import WebSocket, WebSocketDisconnect
from starlette.websockets import WebSocketState
from typing import List, Dict
import logging, random, asyncio, json
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
        for i in range(1, 101):  # Simulating a count to 100 as your example
            chunk = f"{i}, "
            is_final = i == 100
            await asyncio.sleep(0.05)  # Simulate processing time
            yield (chunk, is_final)


    async def handle_new_message(self, data: Dict, websocket: WebSocket):
        action = data.get("action")
        if not action:
            await self.send_message("Error: No action provided", websocket)
            return

        if action == "create":
            session_id = data.get("session_id")
            content = data.get("content")
            user_id = data.get("user_id")

            if not all([content, user_id]):
                await self.send_message("Error: Missing content or user ID", websocket)
                return

            if not session_id:
                session = ChatSession()
                self.db.add(session)
                self.db.commit()
                session_id = session.id
                logging.info(f"New session created with ID: {session_id}")

            new_message = Message(chat_session_id=session_id, content=content, user_id=user_id)
            self.db.add(new_message)
            self.db.commit()

            async_generator = self.mock_chatgpt_stream_response(content)
            try:
                async for chunk, is_final in async_generator:
                    await self.send_message(json.dumps({
                        "content": chunk,
                        "type": "llm_response",
                        "is_final": is_final
                    }), websocket)
                    if is_final:
                        break
            except Exception as e:
                logging.error(f"Error during message streaming: {e}")

    async def process_message(self, data: Dict, websocket: WebSocket):
        await self.handle_new_message(data, websocket)