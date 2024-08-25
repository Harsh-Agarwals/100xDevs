function isAnagram(word1, word2) {
    word1 = word1.toLowerCase()
    word2 = word2.toLowerCase()
    result =  word1.split('').map((x) => word2.split('').includes(x))
    return !result.includes(false) && word1.split('').length == word2.split('').length
}

console.log(isAnagram("brick", "cribk"));
console.log(isAnagram("rauf", "faur"));
console.log(isAnagram("bank", "rank"));
console.log(isAnagram("Debit Card", "Bedit Darc"));
console.log(isAnagram("hello", "helo"));
console.log(isAnagram('', ''));
console.log(isAnagram("listen", "silent"));

function CalculateTotalSpentByCategory(transactions) {
    result = []
    transactions.forEach(element => {
        n = result.filter((x) => x.category === element.category)[0]
        n.category == undefined?result.concat({category: element.category, totalSpent: element.price}):
    });
}






