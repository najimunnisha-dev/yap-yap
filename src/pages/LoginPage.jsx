import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {

    if(!email || !password){
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/users");
      const users = await res.json();

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if(user){
        alert("Login successful ✅");

        // Save user (for later use)
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect to chat page (we will create later)
        navigate("/chat");

      } else {
        alert("Invalid email or password ❌");
      }

    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="main-container">

      <div className='left-panel'>
        <h1>Yap-Yap</h1>
        <p>Yap it your way !!</p>
      </div>

      <div className='right-panel'>
        <div className='login-container'>
          <h3>Welcome</h3>

          <input 
            type='email' 
            placeholder='Email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input 
            type='password' 
            placeholder='Password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>

          <p>Don't have an account?</p>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>

    </div>
  );
}

export default LoginPage;