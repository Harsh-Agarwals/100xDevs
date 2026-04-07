import asyncio
import websockets
import json

async def run():
    uri = "ws://localhost:8080"

    async with websockets.connect(uri) as websocket:
        print("Connected to ws server at ws://localhost:8080")
        await websocket.send("Send me BTC/USDT price updates!")
        print("Message sent to server: Send me BTC/USDT price updates!")
        while True:
            price = await websocket.recv()  # Keep the connection open to receive messages
            print("Received from server:", price)

asyncio.run(run())