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
- *Express*
- *dotenv*: for saving passwords
- *sql2*: for sql
- *uuid*: generate UUID (Universally Unique Identifier). Useful in creating unique keys in databases, session identifiers, etc.
- *CORS: Cross Origin Resource Sharing*: Web browsers by default allows requests from origin, and to make it flexible, to make the resource accessible, we bypass default origin, and user CORS.
