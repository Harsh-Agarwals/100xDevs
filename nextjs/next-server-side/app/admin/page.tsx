import { prisma } from '@/lib/prisma'

// const client = new PrismaClient();


const getAdmin = async () => {
    const admin = await prisma.admin.findFirst();
    console.log(admin);
    return { name: admin?.name, email: admin?.email };
}

interface userType {
    name: string,
    email: string
}

export default async function firstAdmin() {
    const user = await getAdmin();
    console.log(user);
    
    // const { name, email } = user;

    return (
        <div>
            <h2>hello</h2>
            <div className="name">
                <h2>{user.name}</h2>
            </div>
            <div className="mail">
                <h4>{user.email}</h4>
            </div>
        </div>
    )
}