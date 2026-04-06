import asyncio
import websockets

connected_clients = set()

async def handler(websocket):
    connected_clients.add(websocket)
    print("Connected to WS server")
    print(f"Total connected clients: {len(connected_clients)}")
    print("Connected clients:", connected_clients)
    try:
        file_received = await websocket.recv()
        print("File received from client")
        with open("received_file.txt", "wb") as f:
            f.write(file_received)
        print("File saved as received_file.txt")
        await websocket.send("File received and saved successfully")
    except Exception as e:
        print("Error:", e)
    finally:
        connected_clients.remove(websocket)
        await websocket.close()
        print("Websocket connection closed")

async def main():
    async with websockets.serve(handler, 'localhost', 8080):
        print("WS server started at ws://localhost:8080")
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())