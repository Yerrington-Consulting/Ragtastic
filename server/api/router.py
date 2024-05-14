# server/app/api/endpoints/websockets.py
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request, APIRouter
from fastapi.responses import HTMLResponse
from api.endpoints.websockets import websocket_endpoint
from api.endpoints import chat  
# from ...services.chat_manager import ChatManager
import asyncio
import logging

basic_text = """
<pre>
██████╗  █████╗  ██████╗ ████████╗ █████╗ ███████╗████████╗██╗ ██████╗
██╔══██╗██╔══██╗██╔════╝ ╚══██╔══╝██╔══██╗██╔════╝╚══██╔══╝██║██╔════╝
██████╔╝███████║██║  ███╗   ██║   ███████║███████╗   ██║   ██║██║     
██╔══██╗██╔══██║██║   ██║   ██║   ██╔══██║╚════██║   ██║   ██║██║     
██║  ██║██║  ██║╚██████╔╝   ██║   ██║  ██║███████║   ██║   ██║╚██████╗
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝ ╚═════╝
                API v1.0 www.we-will-have-a-website.com
</pre>
"""

routes = [
    {
        "path": "/ws/chat",
        "endpoint": websocket_endpoint,
        "methods": ["websocket"]
    },
    {
        "path": "/",
        "endpoint": HTMLResponse(basic_text),
        "methods": ["get"]
    },
]
router = APIRouter()

# Include the chat router
router.include_router(chat.router, prefix="/api")

for route in routes:
    if "methods" in route and "websocket" in route["methods"]:
        router.websocket_route(route["path"])(route["endpoint"])
    else:
        router.route(route["path"], methods=route["methods"])(route["endpoint"])

