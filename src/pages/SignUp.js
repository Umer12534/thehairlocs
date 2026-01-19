import { Link } from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { useState } from "react";
import {app} from "../firebase";
import "../styles/Auth.css";

const auth = getAuth(app);
function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleSingup = ()=>{
        createUserWithEmailAndPassword(auth, email, password)
    }
    return (
        <div className="auth-wrapper">
            <div className="auth-card">

                {/* Logo */}
                <div className="auth-logo">
                <img src="./logo192.png" alt="Brand Logo" />
                </div>

                <h2 className="auth-title">Create account</h2>
                <p className="auth-subtitle">Enter your details to sign up</p>

                <input
                    type="email"
                    className="auth-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                />

                <input
                    type="password"
                    className="auth-input"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />

                <input
                    type="password"
                    className="auth-input"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                />

                <button onClick={handleSingup}  className="continue-btn">Create Account</button>

                <p className="switch-auth">
                Already have an account? <Link to="/login">Sign in</Link>
                </p>

                

            </div>
        <div className="auth-footer">
            <Link to="/privacy-policy">Privacy policy</Link>
            <Link to="/terms">Terms of service</Link>
        </div>
        </div>
    );
}

export default Signup;
