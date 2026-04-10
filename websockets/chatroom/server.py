import websockets
import asyncio
import sys
import json

connected_clients = set()
rooms = {"common": set()}

# start a few servers with: python server.py --port <port>
# when client connects, it will connect to any of the available servers on localhost:8000, localhost:8001, localhost:8002 based on load balancing
# every client will by default gets connected to common room and all the rooms mentioned while running client.py, eg python client.py --room room1 --room room2, so that it can connected to these rooms
# redis will be used to connect servers and share messages between them, so that all clients can receive messages from all servers and broadcast messages to a particular room or a particular client or globally to all clients

async def handler(websocket):
    print("Client connected")
    connected_clients.add(websocket)
    print(f"Total connected clients: {len(connected_clients)}")
    print(f"Connected clients: {connected_clients}")
    try:
        async for message in websocket:
            data = json.loads(message)
            if data['message'] == "LOAD":
                await websocket.send(json.dumps({"load": len(connected_clients)}))
            elif data['message'] == "ROOMS":
                rooms_list = data['rooms']
                for room in rooms_list:
                    # if room not in rooms.keys():
                    #     rooms[room] = set()
                    # rooms[room].add(websocket)
                    rooms.setdefault(room, set()).add(websocket)
                rooms["common"].add(websocket)
                print(f"Client joined rooms: {rooms_list}")
                await websocket.send(json.dumps({"message": "JOINED", "rooms": rooms_list}))
            elif data['message'] == 'EXIT':
                print("Client requested to exit")
                # remove client from all rooms
                for room in list(rooms.keys()):
                    # if websocket in rooms[room]:
                    #     rooms[room].remove(websocket)
                    rooms[room].discard(websocket)
                print("Client removed from all rooms")
                await websocket.send(json.dumps({"message": "EXITED"}))
                break
            elif data["message"] == "BROADCAST":
                print(f"Received message from client: {data['content']}")
                if data['rooms'] == 'all':
                    rooms_to_send = list(rooms.keys())
                else:
                    rooms_to_send = data['rooms']
                for room in rooms_to_send:
                    if room in rooms:
                        for client in list(rooms[room]):
                            try:
                               await client.send(json.dumps({"message": f"{data['content']} (from room {room})"}))
                            except Exception as e:
                                print(f"Error sending message to client: {e}")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        print("Client disconnected")
        # connected_clients.remove(websocket)
        connected_clients.discard(websocket)

        for room in rooms.values():
            rooms[room].discard(websocket)

        await websocket.close()

async def main(port: int):
    async with websockets.serve(handler, 'localhost', port):
        print(f"Server started on ws://localhost:{port}")
        await asyncio.Future()

if __name__ == "__main__":
    # starting server with: python server.py --port <port>
    port = int(sys.argv[2])
    asyncio.run(main(port))