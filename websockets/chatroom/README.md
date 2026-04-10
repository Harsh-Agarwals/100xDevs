# Distributed Real-Time Chat System with Rooms + Private Messaging + Presence

## 🎯 Features (Must Have)

---

### 🟢 1. Multi-server WebSocket system

* 3–4 WS servers running on different ports
* Simulate load balancing manually

---

### 🟢 2. Rooms (Pub/Sub)

* Users can join rooms:

  * `room_1`, `room_2`, `room_3`
* Messages go only to room members

---

### 🟢 3. Private Messaging

* User A → User B (same server or different server)

---

### 🟢 4. Redis Pub/Sub Layer

Use:

* Redis

👉 This is the heart of the system

---

### 🟢 5. Presence System (IMPORTANT 🔥)

Track:

```text
user_id → which server
user_id → online/offline
```

👉 This is what real systems do

---

### 🟢 6. Broadcast Channel

* Global announcements

---

# 🧱 3. Architecture I’ll Build

```text
Clients (100+)
      ↓
WS Server A (port 8001)
WS Server B (port 8002)
WS Server C (port 8003)
      ↓
      Redis (Pub/Sub)
```

# 🚀 6. Implementation Plan (Step-by-Step)

---

## 🧩 Step 1: Basic WS server

* Accept connections
* Assign user_id

---

## 🧩 Step 2: Add rooms

* Maintain:

```python
room → set(users)
```

---

## 🧩 Step 3: Add Redis Pub/Sub

* Each server subscribes to:

  * `room_*`
  * `user_*`

---

## 🧩 Step 4: Message routing

### If same server:

```text
send directly
```

### Else:

```text
publish to Redis
```

---

## 🧩 Step 5: Presence system

Store in Redis:

```text
user_id → server_id
```

---

## 🧩 Step 6: Multi-server run

Run:

```bash
python server.py --port 8001
python server.py --port 8002
python server.py --port 8003
```

---

## 🧩 Step 7: Simulate 100+ users

* Write script to spawn clients
* Or open multiple terminals

---

# 🧠 7. Advanced Add-ons (If You Want to Go 10x)

---

## 🔥 1. Message persistence

Use:

* Apache Kafka

---

## 🔥 2. Rate limiting

Prevent spam

---

## 🔥 3. Backpressure handling

Slow clients → drop messages

---

## 🔥 4. Load balancer simulation

Randomly assign users to servers

---