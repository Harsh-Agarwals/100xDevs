import {PrismaClient} from '@prisma/client';
import { log } from 'console';

const prisma = new PrismaClient();

async function addUser(email: string, name?: string) {
    const user = await prisma.person.create({
        data: {
            email: email,
            name: name || undefined
            // firstName: firstName || undefined,
            // lastName: lastName || undefined,
            // password: password
        },
        select: {
            id: true,
            email: true,
            name: true
            // password: true
        }
    });
    console.log(user);    
}

async function updateUser(id: number, name: string) {
    const updt = await prisma.person.update({
        where: {
            id: id
        },
        data: {
            name: name
        }
    });
    console.log(updt);
}

async function getUserDetail(email: string) {
    const usr = await prisma.person.findMany({
        where: {
            email: email
        },
        select: {
            email: true,
            name: true
            // firstName: true,
            // password: true
        },
        take: 3
    });
    return usr;
}

async function addTodo(title: string, done: boolean, userId: number, description?: string) {
    const td = await prisma.todo.create({
        data: {
            title: title,
            description: description || undefined,
            done: done,
            createdBy: userId
        }
    });
    console.log(td);    
}

async function getTodoAndUser(email: string) {
    const ut = await prisma.person.findMany({
        relationLoadStrategy: 'join',
        include: {
            todos: true
        },
        where: {
            email: email
        }
    });
    console.log(ut);
    return ut;
}

let emai: string = "harshahars223@gmail.com"
addUser(emai, "Harsh3")
.then(async() => {
    // await updateUser(1, "gahE^2H#sE3");
    await addTodo('play cricket 2', true, 1);
    const user = await getUserDetail("harshahars233@gmail.com");
    console.log(`User: ${JSON.stringify(user)}`);
    const ut = await getTodoAndUser('harshahars233@gmail.com')
    console.log(`UT: ${JSON.stringify(ut)}`);    
    await prisma.$disconnect();
})
.catch(async(e) => {
    console.log(`Error: ${e}`);
    await prisma.$disconnect();
    process.exit(1);
})