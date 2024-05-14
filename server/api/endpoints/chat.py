# server/api/endpoints/chat.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import database, models
from typing import List
import schemas
from services.chat_manager import ChatManager

router = APIRouter()
chat_service = ChatManager()

def get_chat_manager():
    return chat_service

@router.post("/messages/", response_model=schemas.Message)
def create_message(message: schemas.MessageCreate, db: Session = Depends(database.get_db)):
    return chat_service.create_message(db=db, message=message)

@router.get("/chat_sessions", response_model=List[schemas.ChatSessionWithFirstMessage])
def get_chat_sessions(chat_manager: ChatManager = Depends(get_chat_manager)):
    sessions_with_first_message = chat_manager.get_chat_sessions_with_first_message()
    return [
        schemas.ChatSessionWithFirstMessage(
            id=session.id,
            created_at=session.created_at,
            first_message_content=first_message_content
        ) for session, first_message_content in sessions_with_first_message
    ]

@router.get("/chat_sessions/{session_id}/messages", response_model=List[schemas.Message])
def get_messages(session_id: int, chat_manager: ChatManager = Depends(get_chat_manager)):
    messages = chat_manager.get_messages(session_id)
    return messages
