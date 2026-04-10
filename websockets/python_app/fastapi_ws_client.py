import asyncio
import websockets

async def main():
    uri = "ws://127.0.0.1:8000/ws"
    async with websockets.connect(uri) as websocket:
        await websocket.send("Hello, WebSocket server!")
        response = await websocket.recv()
        print("Received from server:", response)

if __name__ == "__main__":
    asyncio.run(main())