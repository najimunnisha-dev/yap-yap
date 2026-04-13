import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/LoginPage.css";

function LoginPage() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`main-container ${darkMode ? "dark" : "light"}`}>
      {/* Toggle Button */}
      <div className='theme-toggle'>
        <button onClick={toggleTheme}>{darkMode ? "Dark" : "Light"}</button>
      </div>

      <div className='left-panel'>
        <h1>Yap-Yap</h1>
        <p>Yap it your way !!</p>
      </div>

      <div className='right-panel'>
        <div className='login-container'>
          <h3>Welcome</h3>

          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />

          <button>Login</button>

          <p>Don't have an account?</p>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
