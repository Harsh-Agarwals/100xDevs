// Given an array of user, filter out users having age>18

type UserY = {
    namex: string,
    age: number
}

type arr = UserY[];

function legitUser(user: UserY[]) {
    return user.filter(x => x.age>=18);
}

// function legitUser(user: arr) {
//     return user.filter(x => x.age>=18);
// }

const legalUsers = legitUser([
    {namex: 'asfasd', age: 53},
    {namex: 'bbec', age: 12},
    {namex: 'brfd', age: 22}
]);

console.log(legalUsers);
