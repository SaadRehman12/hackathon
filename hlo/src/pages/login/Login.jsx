import { useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { login, register } from "../../store/slices/userSlice";

// Validation schemas
const signupValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  // Signup state
  const [name, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Error state for each field
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const signupSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    try {
      await signupValidationSchema.validate({ email, password }, { abortEarly: false });
      const userRegister = { name, email, password };
      const result = await dispatch(register(userRegister));

      if (register.fulfilled.match(result)) {
        console.log("User data:", userRegister);
      } else {
        alert(result.payload || 'Signup failed');
      }
    } catch (err) {
      err.inner.forEach((error) => {
        if (error.path === "email") setEmailError(error.message);
        if (error.path === "password") setPasswordError(error.message);
      });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const result = await dispatch(login({ loginEmail, loginPassword }));
     console.log(loginEmail);
     console.log(loginPassword);
     console.log(result);
      
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="main">
      {/* Left Section */}
      {isLogin ? (
        <div className="left-section">
          <div className="login-form">
            <div className="login">
              <h2 className="login-text">Login</h2>
            </div>
            <form onSubmit={handleLoginSubmit}>
              <div className="email">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <br />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <div className="submit-login">
                <button type="submit" className="login-button">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="left-switch">
          <div className="left-side">
            <div className="left-side-text">
              <h1>Already Registered</h1>
              <p>Login to Your Account</p>
            </div>
            <div className="button-section">
              <button onClick={toggleForm} className="switch-button">
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Right Section */}
      {isLogin ? (
        <div className="right-switch">
          <div className="right-side">
            <div className="right-side-text">
              <h1>Welcome to Our App</h1>
              <p>Register an Account</p>
            </div>
            <div className="button-section">
              <button onClick={toggleForm} className="switch-button">
                Signup
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="right-section">
          <div className="signup-form">
            <h2 className="signup">Signup</h2>
            <form className="signup-form-container" onSubmit={signupSubmit}>
              <div className="fullname">
                <label htmlFor="fullname" className="input-label">
                  Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Enter Name"
                  className="signup-input"
                  value={name}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div className="email">
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  className="signup-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p className="error">{emailError}</p>}
              </div>
              <div className="password">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  className="signup-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <p className="error">{passwordError}</p>}
              </div>
              <div className="submit-signup">
                <input type="submit" value="Signup" className="signup-button" />
              </div>
            </form>
          </div>
        </div>
      )}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
    </div>
  );
}
