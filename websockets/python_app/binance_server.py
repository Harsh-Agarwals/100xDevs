import websocket as ws_client
import websockets
import asyncio
import json
import threading

connected_clients = set()
loop = None

def on_message(ws, message):
    data = json.loads(message)
    price = data.get("c")  # 'c' is the current price in the ticker stream
    print("Current BTC/USDT price:", price)
    asyncio.run_coroutine_threadsafe(broadcast_message(price), loop)

def on_error(ws, error):
    print("WebSocket error:", error)

def on_close(ws, close_status_code, close_msg):
    print("WebSocket closed with code:", close_status_code, "and message:", close_msg)

def on_open(ws):
    print("Connected to Binance WebSocket")

def binance_client():
    print("started binance client thread")
    uri = "wss://stream.binance.com:9443/ws/btcusdt@ticker"
    ws = ws_client.WebSocketApp(
        uri,
        on_message=on_message,
        on_error=on_error,
        on_close=on_close
    )
    print("Created WebSocketApp for Binance")
    ws.on_open = on_open
    print("Running WebSocketApp for Binance")
    ws.run_forever()
    print("Binance WebSocket client stopped")

async def broadcast_message(message):
    print("Broadcasting message to clients:", message)
    dead_clients = set()
    for client in connected_clients:
        try:
            await client.send(f"BTC/USDT price: {message}")
        except:
            dead_clients.add(client)

    for dc in dead_clients:
        connected_clients.remove(dc)
        print("Removed dead client:", dc)

async def handler(websocket):
    connected_clients.add(websocket)
    print("Connected to WS client")
    print(f"Total connected clients: {len(connected_clients)}")
    print("Connected clients:", connected_clients)
    try:
        async for message in websocket:
            print("Message received from client:", message)
            # dead_clients = set()
            # for client in connected_clients:
            #     try:
            #         await client.send(f"Broadcast: {message}")
            #     except:
            #         dead_clients.add(client)

            # for dc in dead_clients:
            #     connected_clients.remove(dc)
            #     print("Removed dead client:", dc)

    except Exception as e:
        print("Error:", e)
    finally:
        connected_clients.remove(websocket)
        await websocket.close()
        print("Websocket connection closed")

async def main():
    print('here')
    global loop
    loop = asyncio.get_event_loop()
    server = await websockets.serve(handler, 'localhost', 8080)
    print("Connected to WS server at ws://localhost:8080")
    threading.Thread(target=binance_client, daemon=True).start()
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())