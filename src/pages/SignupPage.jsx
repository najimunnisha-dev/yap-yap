import { useState } from "react";
import '../styles/SignupPage.css';
import { Link } from "react-router-dom";

function SignupPage(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        if(!name || !email || !password){
            alert("Please fill all fields");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            if(res.ok){
                alert("Signup successful ✅");
                setName("");
                setEmail("");
                setPassword("");
            } else {
                alert("Signup failed ❌");
            }

        } catch (error) {
            console.log(error);
            alert("Server error");
        }
    };

    return(
        <div className="signup-main-container">

            <div className="signup-left-panel">
                <h1>Yap-Yap</h1>
                <p>Your chat world begins here!!</p>
            </div>

            <div className="signup-right-panel">
                <div className="signup-container">
                    <h3>Create Account</h3>

                    <input 
                        type="text" 
                        placeholder="Full Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />

                    <input 
                        type="email" 
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    <button onClick={handleSignup}>Sign Up</button>

                    <p>Already have an account?</p>
                    <Link to="/">Login</Link>
                </div>
            </div>

        </div>
    )
}

export default SignupPage;