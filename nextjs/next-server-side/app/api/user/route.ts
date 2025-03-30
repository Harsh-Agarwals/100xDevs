// export async function GET() {
//     return Response.json({ name: "Harsh", email: "harsh@gmail.com" })
// }

import { NextRequest, NextResponse } from "next/server";

interface UserInput {
    username: string,
    password: string
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    console.log(data);
    
    // console.log(username, password);    
    // return Response.json({ username: username, password: password});
    return NextResponse.json({message: 'logged in!', user: data})
}