import asyncio
import websockets

connected_clients = set()

async def handler(websocket):
    connected_clients.add(websocket)
    print("Client connected")

    try:
        await websocket.send("Welcome to the WebSocket server!")
        for message in websocket:
            print(f"Message received: {message}")
            for client in connected_clients:
                if client.open:
                    await client.send(f"Broadcast: {message}")

    except Exception as e:
        print(f"Error: {e}")

    finally:
        connected_clients.remove(websocket)
        print("Client disconnected")

async def main():
    async with websockets.serve(handler, 'localhost', 8080):
        print("WebSocket server started on ws://localhost:8080")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())