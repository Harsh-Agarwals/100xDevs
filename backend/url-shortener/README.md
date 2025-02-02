URL Shortener
- Basic Backend stuff
- System Design fundamental

My understanding: 
Paste a URL => generate new short URL.
This url when requested will go to the backend which will call the original URL.

// Storing URLs in memory

Options:
- Array: O(n) time complexity
- Hash Tables: Better than arrays for faster retrieval
- SQL Db: Easy to search if dataset becomes too big

Hashing:
hashing alphabets: [A-Z](26), [a-z](26) & [0-9](10)

for each word in the shortened URL, we can have 62 alphabets.
For 100000 links, we will have 4 letter in the shorted URL.

# Hashing method:
62 bit hashing

# Libraries used:
- **Express**
- **dotenv**: for saving passwords
- **sql2**: for sql
- **uuid**: generate UUID (Universally Unique Identifier). Useful in creating unique keys in databases, session identifiers, etc.
- **CORS: Cross Origin Resource Sharing**: Web browsers by default allows requests from origin, and to make it flexible, to make the resource accessible, we bypass default origin, and user CORS.

# System Design

## Functional Requirements
- Given long link, system should generate unique short link faster
- Short link should lead to long link
- Link will expire after a certain time

## Non-functional Requirements
- High availability (ensuring system can manage billions of requests)
- URL redirection should happen in real time, with minimal latency
- Short link should not be predictable

## Data capacity modelling
- 1 alphabet: 1byte memory
- **link**: let 2048 alphabet maximum in a link: 2048 byte (2KB)
- **created at**: DD:MM:YY HH:MM:SS = 17Byte
- **expired at**: 17Byte
- **short link**: 7Byte (7 word hash)
- **index/key**: limit: 1800000000: 10Byte
*Total*:2099 byte per link

let my traffic be 30Million/month
30,000,000 x 2099 byte ~ 55GB/month = 700GB/year

Overall system: 30M/month * 12month * 5year = 1.8B requests (We will be requiring 7 letter in the short URL)

## Exhaust time
- Total combinations: 62^7 ~ 3500 Billion URLs
- Considering 1000 requests/second, it will be 31.5Billion/year. Around 110 years will take to exhaust this much unique combinations.

### Now we need to efficiently store and retrieve data from DB

## Storing:
- Check the db if the long URL exists
- If not present, this new data will be inserted to DB

**Above technique will work best with one server, but in case multiple severs are present, it can lead to race condition, where many servers simultaneous can create same index for newer link, corrupting out database.**
