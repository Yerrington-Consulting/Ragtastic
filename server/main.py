from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request
from fastapi.responses import HTMLResponse
from starlette.middleware.cors import CORSMiddleware
from typing import List, Dict
import asyncio
import logging
import json  
import time  

# Project specific imports
from api.router import router
from database.database import engine, Base
from database.models import *

# Create database/tables if they don't exist
Base.metadata.create_all(bind=engine)

# Set up logging - tbd move settings to config file
logging.basicConfig(level=logging.INFO)

# Create FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add router to app
app.include_router(router) # router is the router object defined in api/router.py

@app.get("/linkedin/callback", response_class=HTMLResponse)
async def linkedin_callback(request: Request):
    code = request.query_params.get('code')
    state = request.query_params.get('state')
    if not code:
        return HTMLResponse(content="No code provided", status_code=400)
    return HTMLResponse(content=f"Authorization code: {code}")
