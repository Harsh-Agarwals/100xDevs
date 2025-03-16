// Interface lets you extend to classes
interface User {
    firstName: string,
    lastName: string,
    age: number,
    email?: string // email is optional
};

const user1 = {
    firstName: 'Harsh',
    lastName: 'Agarwal',
    age: 25
}

const user2 = {
    firstName: 'Harsh',
    lastName: 'Agarwal',
    age: 14,
    email: "Harshaga@gmail.com"
}

// const isLegit = (user: {firstName: string, lastName: string, age: number}) => {
//     return user.age>=18;
// }

const isLegit = (user: User): boolean => {
    return user.age>=18;
}

const res1: boolean = isLegit(user1);
const res2: boolean = isLegit(user2);

console.log(res1, res2);
