# server/schemas.py

from pydantic import BaseModel
from datetime import datetime

class MessageBase(BaseModel):
    content: str

class MessageCreate(MessageBase):
    pass

class Message(MessageBase):
    id: int
    created_at: datetime
    chat_session_id: int

    class Config:
        from_attributes = True  # Updated for Pydantic V2

class ChatSessionBase(BaseModel):
    pass

class ChatSessionCreate(ChatSessionBase):
    pass

class ChatSession(ChatSessionBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True  # Updated for Pydantic V2
