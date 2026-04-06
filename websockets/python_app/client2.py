import websockets
import asyncio

async def receive_message(websocket):
    async for message in websocket:
        print(f"Received from server: {message}")

async def input_handler(websocket):
    while True:
        # input_message = input("Enter a message to send to the server (or 'exit' to quit): ")
        input_message = await asyncio.to_thread(input, "Enter a message to send to the server (or 'exit' to quit): \n")
        if input_message.lower() == "exit":
            print("Exiting...")
            break
        await websocket.send(input_message)

async def main():
    uri = "ws://localhost:8080"
    async with websockets.connect(uri) as websocket:
        print("Connected to the server")

        await asyncio.gather(
            receive_message(websocket),
            input_handler(websocket)
        )

if __name__ == "__main__":
    asyncio.run(main())