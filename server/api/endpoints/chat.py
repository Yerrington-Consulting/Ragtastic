# server/api/endpoints/chat.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import database, models
from typing import List
import schemas
from services.chat_manager import ChatManager

router = APIRouter()
chat_service = ChatManager()

@router.post("/messages/", response_model=schemas.Message)
def create_message(message: schemas.MessageCreate):
    return chat_service.create_message(message=message)

@router.get("/chat_sessions", response_model=List[schemas.ChatSessionWithFirstMessage])
def get_chat_sessions():
    sessions_with_first_message = chat_service.get_chat_sessions_with_first_message()
    return [
        schemas.ChatSessionWithFirstMessage(
            id=session.id,
            created_at=session.created_at,
            content=first_message_content,
            first_message_content=first_message_content
        ) for session, first_message_content in sessions_with_first_message
    ]

@router.get("/chat_sessions/{session_id}/messages", response_model=List[schemas.Message])
def get_messages(session_id: int):
    return chat_service.get_messages(session_id=session_id)