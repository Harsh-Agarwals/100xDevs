export default function signInLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className=" bg-red-200 p-2 text-center text-red-900">Get 20% discount on code XX20!</div>
            <div>{children}</div>
        </>
    )
}