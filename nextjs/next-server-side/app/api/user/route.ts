// export async function GET() {
//     return Response.json({ name: "Harsh", email: "harsh@gmail.com" })
// }

import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'

interface UserInput {
    username: string,
    password: string
}
// const client = new PrismaClient();

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log(body);

    try {
        await prisma.admin.create({ data: {name: body.username, email: body.password } });
        console.log('success');        
    } catch (error) {
        console.log(error);
    }
    
    // console.log(username, password);    
    // return Response.json({ username: username, password: password});
    return NextResponse.json({message: 'logged in!', user: body})
}

export async function GET(req: NextRequest) {
    const firstadmin = await prisma.admin.findFirst()
    console.log(firstadmin);
    return NextResponse.json({ admin: firstadmin })
}