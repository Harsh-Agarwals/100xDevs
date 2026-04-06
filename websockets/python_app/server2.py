import websockets
import asyncio

connected_clients = set()

async def handler(websocket):
    print("Connected to websocket server")
    connected_clients.add(websocket)
    print(f"Total connected clients: {len(connected_clients)}")
    print("Connected clients:", connected_clients)
    try:
        # message = await websocket.recv()
        # print("Message received:", message)
        # greeting = f"Hello, {message}! Welcome to the WebSocket server!"
        # await websocket.send(greeting)
        # print(f"Greeting sent to {message}: {greeting}")
        async for message in websocket:
            print("Message received:", message)
            dead_clients = set()
            for client in connected_clients:
                try:
                    await client.send(f"Broadcast: {message}")
                except:
                    dead_clients.add(client)
                    
            for dc in dead_clients:
                connected_clients.remove(dc)
                print("Removed dead client:", dc)
    except Exception as e:
        print("Error:", e)
    finally:
        connected_clients.remove(websocket)
        await websocket.close()
        print("Websocket connection closed")

async def main():
    async with websockets.serve(handler, 'localhost', 8080):
        print("Websocket server started on ws://localhost:8080")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())