import '../styles/SignupPage.css';
import { Link } from "react-router-dom";

function SignupPage(){
    return(
        <div className="signup-main-container">

            {/* Left Panel */}
            <div className="signup-left-panel">
                <h1>Yap-Yap</h1>
                <p>Your chat world begins here!!</p>
            </div>

            {/* Right Panel */}
            <div className="signup-right-panel">
                <div className="signup-container">
                    <h3>Create Account</h3>

                    <input type="text" placeholder="Full Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />

                    <button>Sign Up</button>

                    <p>Already have an account?</p>
                    <Link to="/">Login</Link>
                </div>
            </div>

        </div>
    )
}

export default SignupPage;