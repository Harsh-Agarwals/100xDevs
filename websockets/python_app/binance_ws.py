import websocket
import websockets
import asyncio
import json

def on_message(ws, message):
    print("Received message:", message)
    data = json.loads(message)
    price = data.get("c")  # 'c' is the current price in the ticker stream
    print("Current BTC/USDT price:", price)

def on_error(ws, error):
    print("WebSocket error:", error)

def on_close(ws, close_status_code, close_msg):
    print("WebSocket closed with code:", close_status_code, "and message:", close_msg)

def on_open(ws):
    print("Connected to Binance WebSocket")

if __name__ == "__main__":
    uri = "wss://stream.binance.com:9443/ws/btcusdt@ticker"
    ws = websocket.WebSocketApp(
        uri,
        on_message=on_message,
        on_error=on_error,
        on_close=on_close,
    )
    ws.on_open = on_open
    ws.run_forever()
