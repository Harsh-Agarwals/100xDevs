import websockets
import asyncio

async def main():
    uri = "ws://localhost:8080"
    async with websockets.connect(uri) as websocket:
        print("Connected to the server")
        name = input("Enter your name: ")
        await websocket.send(name)
        print(f"Name {name} sent to the server")
        greeting = await websocket.recv()
        print(f"Received from server: {greeting}")

if __name__ == "__main__":
    asyncio.run(main())