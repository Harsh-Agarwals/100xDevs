import Button from "@/components/Button";

export default function SignIn() {
    return(
        <div className="signin">
            <div className="name">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" required />
            </div>
            <div className="pwd">
                <label htmlFor="pwd">Password</label>
                <input type="password" name="pwd" id="pwd" required />
            </div>
            <div className="btn">
                <Button />
            </div>
        </div>
    )
}