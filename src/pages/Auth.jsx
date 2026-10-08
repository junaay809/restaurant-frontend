import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRestaurant } from "../context/RestaurantContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import dammysLogo from "../assets/Dammy's Logo.png";
import "./Auth.css";

const API_BASE_URL = "https://restaurant-backend-production-b36b.up.railway.app";
function Auth() {
    const navigate = useNavigate();
    const location = useLocation();

    const { setIsAuthenticated, setAuthUser } = useRestaurant();

    const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isLogin, setIsLogin] = useState(
        location.state?.mode !== "signup"
    );

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setError("");
    };

    const switchMode = () => {
        setIsLogin(!isLogin);

        setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        });

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        // -------------------------
        // SIGN UP VALIDATION
        // -------------------------
        if (!isLogin) {
            if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match.");
                return;
            }

            if (formData.password.length < 8) {
                setError("Password must be at least 8 characters.");
                return;
            }
        }

        setLoading(true);

        try {
            const endpoint = isLogin
                ? `${API_BASE_URL}/api/auth/login/`
                : `${API_BASE_URL}/api/auth/register/`;

            const body = isLogin
                ? {
                      username: formData.username,
                      password: formData.password,
                  }
                : {
                      username: formData.username,
                      email: formData.email,
                      password: formData.password,
                  };

            const response = await fetch(endpoint, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
});

            const data = await response.json();

            if (!response.ok) {
                if (data.detail) {
                    throw new Error(data.detail);
                }

                if (data.error) {
                    throw new Error(data.error);
                }

                if (data.username) {
                    throw new Error(data.username[0]);
                }

                if (data.email) {
                    throw new Error(data.email[0]);
                }

                if (data.password) {
                    throw new Error(data.password[0]);
                }

                throw new Error("Something went wrong. Please try again.");
            }

            // -------------------------
            // SAVE AUTHENTICATION
            // -------------------------

            if (data.access) {
                localStorage.setItem("access_token", data.access);
            }

            if (data.refresh) {
                localStorage.setItem("refresh_token", data.refresh);
            }

            // Save username locally
            localStorage.setItem("username", formData.username);

            // Save user data if backend sends it
            if (data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            }

            setIsAuthenticated(true);
setAuthUser(JSON.parse(localStorage.getItem("user")));

            // -------------------------
            // SUCCESS
            // -------------------------

            navigate("/");

            // Reload so menu immediately
            // changes from Sign Up/Login
            // to the user's profile circle.
            window.location.reload();

        } catch (err) {
            setError(
                err.message ||
                "Unable to connect to the server."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-container">

                {/* LOGO */}
                <Link to="/" className="auth-logo">
                    <img
                        src={dammysLogo}
                       alt="Dammy's Spice"
                                />
                </Link>

                {/* HEADING */}
                <div className="auth-heading">
                    <h1>
                        {isLogin
                            ? "Welcome Back"
                            : "Create Your Account"}
                    </h1>

                    <p>
                        {isLogin
                            ? "Sign in to continue to Dammy & Spice."
                            : "Join Dammy & Spice and enjoy a better ordering experience."}
                    </p>
                </div>

                {/* ERROR */}
                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                {/* FORM */}
                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    {/* USERNAME */}
                    <div className="auth-field">
                        <label>Username</label>

                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* EMAIL - SIGN UP ONLY */}
                    {!isLogin && (
                        <div className="auth-field">
                            <label>Email Address</label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    {/* PASSWORD */}
                    <div className="auth-field">
    <label>Password</label>

    <div className="password-input-wrapper">
        <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
        />

        <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={
                showPassword
                    ? "Hide password"
                    : "Show password"
            }
        >
            {showPassword ? (
                <EyeOff size={20} />
            ) : (
                <Eye size={20} />
            )}
        </button>
    </div>
</div>

                    {/* CONFIRM PASSWORD */}
                    {!isLogin && (
    <div className="auth-field">
        <label>Confirm Password</label>

        <div className="password-input-wrapper">
            <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />

            <button
                type="button"
                className="password-toggle"
                onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                }
                aria-label={
                    showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                }
            >
                {showConfirmPassword ? (
                    <EyeOff size={20} />
                ) : (
                    <Eye size={20} />
                )}
            </button>
        </div>
    </div>
)}

                    {/* FORGOT PASSWORD */}
                    {isLogin && (
                        <div className="forgot-password">
                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/forgot-password")
                                }
                            >
                                Forgot password?
                            </button>
                        </div>
                    )}

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Please wait..."
                            : isLogin
                            ? "Log In"
                            : "Create Account"}
                    </button>

                </form>

                {/* SWITCH LOGIN / SIGNUP */}
                <div className="auth-switch">

                    <span>
                        {isLogin
                            ? "Don't have an account?"
                            : "Already have an account?"}
                    </span>

                    <button
                        type="button"
                        onClick={switchMode}
                    >
                        {isLogin
                            ? "Sign Up"
                            : "Log In"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Auth;