import Link from "next/link";

export default function pages() {
    return (
        <>
            <div>Discount page</div>
            <Link href={`../signup`}>Sign Up</Link>
        </>
    )
}