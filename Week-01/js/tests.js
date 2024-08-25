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
        if(result.filter((x) => x.category === element.category)[0]) {
            result.filter((x) => x.category === element.category)[0]['totalSpent'] += element.price
        } else {
            content = {category: element.category, totalSpent: element.price}
            result = result.concat(content)
        }
    });
    return result
}

x = CalculateTotalSpentByCategory([
    {
        id: 1,
        timestamp: 1656076800000,
        price: 10,
        category: 'Food',
        itemName: 'Pizza',
    },
])
console.log(x);

console.log(CalculateTotalSpentByCategory([
    {
        id: 1,
        timestamp: 1656076800000,
        price: 10,
        category: 'Food',
        itemName: 'Pizza',
    },
    {
        id: 2,
        timestamp: 1656259600000,
        price: 20,
        category: 'Food',
        itemName: 'Burger',
    },
    {
        id: 3,
        timestamp: 1656019200000,
        price: 15,
        category: 'Clothing',
        itemName: 'T-Shirt',
    },
    {
        id: 4,
        timestamp: 1656364800000,
        price: 30,
        category: 'Electronics',
        itemName: 'Headphones',
    },
    {
        id: 5,
        timestamp: 1656105600000,
        price: 25,
        category: 'Clothing',
        itemName: 'Jeans',
    },
]));

console.log(CalculateTotalSpentByCategory([
    {
        id: 1,
        timestamp: 1656076800000,
        price: 10,
        category: 'Food',
        itemName: 'Pizza',
    },
    {
        id: 2,
        timestamp: 1656105600000,
        price: 20,
        category: 'Food',
        itemName: 'Burger',
    },
    {
        id: 3,
        timestamp: 1656134400000,
        price: 30,
        category: 'Food',
        itemName: 'Sushi',
    },
]));

function FindLargestNumber(list) {
    return list.reduce((a, b) => a>=b?a:b, list[0])
}

console.log(FindLargestNumber([-3.5, -7.2, -2.1, -9.8, -1.9]));
console.log(FindLargestNumber([-15, -27, -8, -12]));
console.log(FindLargestNumber([0, 0, 0, 0]));
console.log(FindLargestNumber([15, 27, 8, 12]));

