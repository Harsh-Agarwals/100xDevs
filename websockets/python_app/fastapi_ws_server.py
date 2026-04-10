from fastapi import FastAPI, WebSocket, WebSocketDisconnect

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    # try:
    #     while True:
    #         data = await websocket.receive_text()
    #         print("Received message:", data)
    #         await websocket.send_text(f"Message received: {data}")
    # except Exception as e:
    #     print("WebSocket connection closed:", e)

    try:
        print("WebSocket connection accepted")
        while True:
            user_input = await websocket.receive_text()

            if 'bye' in user_input.lower() or 'quit' in user_input.lower():
                print("Received exit command, closing WebSocket connection")
                await websocket.send_text("Goodbye! Closing the connection.")
                await websocket.close(code=1000, reason="Client requested to close the connection")
                break
            print("Received message:", user_input)
            await websocket.send_text(f"Message received: {user_input}")
    except WebSocketDisconnect:
        print("WebSocket connection closed")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)