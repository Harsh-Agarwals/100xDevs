import websockets
import asyncio
import sys
import json

servers = ["ws://localhost:8000", "ws://localhost:8001", "ws://localhost:8002"]
def get_rooms_list(argvs_list):
    rooms = []
    for i,j in enumerate(argvs_list):
        if argvs_list[i] == "--room":
            rooms.append(argvs_list[i+1])
    return rooms

async def get_available_load_server(server):
    # get server which has minimum load
    server_loads = {}
    # for server in servers:
        # check load of server and return the one with minimum load
    try:
        async with websockets.connect(server) as websocket:
            await websocket.send(json.dumps({"message": "LOAD"}))
            response = await websocket.recv()
            loads = json.loads(response)
            # server_loads[server] = loads["load"]
            return loads["load"]
    except Exception as e:
        print(f"Error connecting to server {server}: {e}")
        # server_loads[server] = float('inf')  # If server is not reachable, set load to infinity
        return float('inf')
    # return min(server_loads, key=server_loads.get)

async def get_available_port_server():
    tasks = [get_available_load_server(server) for server in servers]
    loads = await asyncio.gather(*tasks)
    return servers[loads.index(min(loads))]

async def receive_messages(websocket):
    while True:
        try:
            message = await websocket.recv()
            message = json.loads(message)['message']
            print(f"\nReceived message: {message}")
        except Exception as e:
            print(f"Error receiving message: {e}")
            break

async def main():
    # starting client with: python client.py --room <room1> --room <room2> ...
    rooms_list = get_rooms_list(sys.argv)
    # definitely it will not choose port of it's own, it will connect to any of the available servers on localhost:8000, localhost:8001, localhost:8002 based on load balancing
    # getting uri for connecting to server, it will connect to any of the available servers on localhost:8000, localhost:8001, localhost:8002 based on load balancing
    # min_load_server = asyncio.run(get_available_port_server())
    # uri = await get_available_port_server()
    uri = await get_available_port_server()
    print(f"Connecting to server: {uri}")
    async with websockets.connect(uri) as websocket:
        print(f"Connecting to server {uri}...")
        await websocket.send(json.dumps({'message': 'ROOMS', 'rooms': rooms_list}))
        print("Sent rooms list to server")
        response = await websocket.recv()
        response = json.loads(response)
        print(f"Received response from server: Joined rooms {response['rooms']}")

        # start receiver
        receiver_task = asyncio.create_task(receive_messages(websocket))

        while True:
            message = await asyncio.to_thread(input, "Enter message to send (or 'exit' to quit):")
            if message.lower() == "exit":
                await websocket.send(json.dumps({"message": "EXIT"}))
                print("Exiting...")
                # response = await websocket.recv()
                # response = json.loads(response)
                # if response["message"] == "EXITED":
                    # print("Exited successfully")
                
                try:
                    response = await websocket.recv()
                    response = json.loads(response)
                    if response["message"] == "EXITED":
                        print("Exited successfully")
                except Exception as e:
                    print(f"Error while exiting: {e}")

                receiver_task.cancel()
                try:
                    await receiver_task
                except asyncio.CancelledError:
                    pass
                
                await websocket.close()
                print("Exited successfully")
                break
            else:
                rooms_to_send = await asyncio.to_thread(input, "Enter rooms to send message to (comma separated, or 'all' for all rooms):")
                if rooms_to_send.lower() == "all":
                    payload = {'message': 'BROADCAST', 'rooms': 'all', 'content': message}
                else:
                    rooms_to_send = [r.lower().strip() for r in rooms_to_send.split(",")]
                    payload = {'message': 'BROADCAST', 'rooms': rooms_to_send, 'content': message}

                await websocket.send(json.dumps(payload))

if __name__ == "__main__":
    asyncio.run(main())