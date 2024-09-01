const fs = require('fs')

async function writeTxt(text) {
    await fs.writeFile("a.txt", text)
}