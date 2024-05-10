# server/app/api/endpoints/websockets.py
from fastapi import WebSocket, WebSocketDisconnect
from services.chat_manager import ChatManager
import asyncio, logging, json, time

manager = ChatManager()

async def send_heartbeat(websocket):
    try:
        while True:
            await asyncio.sleep(30)
            await websocket.send_json({'type': "heartbeat", 'timestamp': int(time.time())})
    except asyncio.CancelledError:
        logging.info("Heartbeat task cancelled")

async def websocket_endpoint(websocket: WebSocket):
    logging.info("WebSocket connection attempt.")
    await manager.connect(websocket)  # Let manager handle the accept
    logging.info("WebSocket connection established.")
    heartbeat_task = asyncio.create_task(send_heartbeat(websocket))
    
    try:
        while True:
            data = await websocket.receive_text()
            data_dict = json.loads(data)
            await manager.process_message(data_dict, websocket)
    except WebSocketDisconnect:
        logging.info("WebSocket disconnected by client.")
    finally:
        heartbeat_task.cancel()
        await heartbeat_task
        manager.disconnect(websocket)
        logging.info("WebSocket connection cleanly terminated.")
