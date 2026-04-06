import asyncio
import websockets

async def handler(websocket):
    print("Websocket connection established")
    connected_clients = set()
    connected_clients.add(websocket)
    print(f"Total connected clients: {len(connected_clients)}")
    print("Connected clients:", connected_clients)

    try:
        # await websocket.send("Hello from the server!")

        # for message in websocket:
        # print("Message received:", message)
        name = await websocket.recv()
        print("Name received:", name)
        # Broadcast the message to all connected clients
        # clients = [client for client in connected_clients if client.open]
        # await asyncio.gather(
            # *[client.send(f"greet: {message}") for client in connected_clients if client.open]
        # )

        greeting = f"Hello, {name}! Welcome to the WebSocket server!"
        await websocket.send(greeting)
        print(f"Greeting sent to {name}: {greeting}")
    except Exception as e:
        print("Error:", e)
    finally:
        websocket.close()
        connected_clients.remove(websocket)
        print("Websocket connection closed")

async def main():
    async with websockets.serve(handler, 'localhost', 8080):
        print("WebSocket server started on ws://localhost:8080")
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())