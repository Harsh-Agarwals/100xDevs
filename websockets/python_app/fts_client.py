import asyncio
import websockets

async def main():
    uri = "ws://localhost:8080"
    async with websockets.connect(uri) as websocket:
        print("Connected to WS server")
        try:
            with open("file_to_send.txt", "rb") as f:
                file_data = f.read()
            await websocket.send(file_data)
            print("File sent to server")
            response = await websocket.recv()
            print("Response from server:", response)
        except Exception as e:
            print("Error:", e)

if __name__ == "__main__":
    asyncio.run(main())