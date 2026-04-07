function LoginPage(){
    return(
        <>
        <h1>Yap-Yap</h1>
        <p>Welcome</p>
        <input type="email" placeholder="Email" required /> <br />
        <input type="password" placeholder="Password" required /> <br />
        <button type="submit">Login</button> <br />
        <p>Don't have an account</p>
        <a href="">Sign Up</a>
        </>
    )
}
export default LoginPage;