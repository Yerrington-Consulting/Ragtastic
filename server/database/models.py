from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref
from .database import Base
import datetime

class ChatSession(Base):
    __tablename__ = 'chat_sessions'
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    messages = relationship('Message', back_populates='session')

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    messages = relationship('Message', back_populates='user')

class LLM(Base):
    __tablename__ = 'llms'
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    messages = relationship('Message', back_populates='llm')

class Message(Base):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True)
    content = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    user_id = Column(Integer, ForeignKey('users.id'))
    chat_session_id = Column(Integer, ForeignKey('chat_sessions.id'))
    llm_id = Column(Integer, ForeignKey('llms.id'), nullable=True)  # Add llm_id field
    user = relationship('User', back_populates='messages')
    session = relationship('ChatSession', back_populates='messages')
    llm = relationship('LLM', back_populates='messages', uselist=False)
