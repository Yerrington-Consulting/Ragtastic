# server/api/endpoints/chat.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import database, models
import schemas
from services.chat_manager import ChatManager

router = APIRouter()

chat_service = ChatManager()

@router.post("/messages/", response_model=schemas.Message)
def create_message(message: schemas.MessageCreate, db: Session = Depends(database.get_db)):
    return chat_service.create_message(db=db, message=message)

@router.get("/chat_sessions/")
def get_chat_sessions(db: Session = Depends(database.get_db)):
    return chat_service.get_chat_sessions(db)

@router.get("/chat_sessions/{session_id}/messages")
def get_messages(session_id: int, db: Session = Depends(database.get_db)):
    return chat_service.get_messages(db, session_id)
