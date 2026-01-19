import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/button/Button";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import "../styles/Auth.css";

const auth = getAuth(app);

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignin = async () => {
        setError("");
        setLoading(true);

        try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/"); 
        } catch (err) {
        setError("Invalid email or password");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
        <div className="auth-card">

            {/* Logo */}
            <div className="auth-logo">
            <img src="/logo192.png" alt="Logo" />
            </div>

            <h2 className="auth-title">Sign in</h2>

            {error && <p className="auth-error">{error}</p>}

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

            <Button
            onClick={handleSignin}
            fullWidth
            size="lg"
            loading={loading}
            marginbottom={0}
            margintop={5}
            variant="secondary"
            >
            Continue
            </Button>

            <p className="auth-subtitle">Sign in or create an account</p>

            <div className="divider">
            <span>or</span>
            </div>

            <Button to="/signup" fullWidth size="lg">
            Create Account
            </Button>
        </div>

        <div className="auth-footer">
            <Link to="/privacy-policy">Privacy policy</Link>
            <Link to="/terms">Terms of service</Link>
        </div>
        </div>
    );
}

export default Login;
