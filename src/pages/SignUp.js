import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { app } from "../config/firebase";
import Button from "../components/ui/button/Button"
import "../styles/Auth.css";

const auth = getAuth(app);

function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        setError("");
        
        // Frontend validation
        if (!email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }
        
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        setLoading(true);

        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password);

            // Redirect after successful signup
            navigate("/login"); 
            } catch (err) {
            //  Firebase error handling
            switch (err.code) {
                case "auth/email-already-in-use":
                setError("Email is already registered");
                break;
                case "auth/invalid-email":
                setError("Invalid email address");
                break;
                case "auth/weak-password":
                setError("Password is too weak");
                break;
                default:
                setError("Something went wrong. Please try again");
            }
            } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
        <div className="auth-card">

            {/* Logo */}
            <div className="auth-logo">
            <img src="./logo192.png" alt="Brand Logo" />
            </div>

            <h2 className="auth-title">Create account</h2>
            <p className="auth-subtitle">Enter your details to sign up</p>

            {error && <div className="auth-error">{error}</div>}

            <input
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />

            <input
                type="password"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />

            <input
                type="password"
                className="auth-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
            />

            <Button 
                onClick={handleSignup}
                className="continue-btn"
                disabled={loading}
            >
                {loading ? "Creating account..." : "Create Account"}
            </Button>

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
