import { useState } from "react";
import * as Yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import "./login.css";

// Validation schemas
const signupValidationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  fullname: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const loginValidationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  
  // Signup state
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  
  // Login state
  const [loginUserName, setLoginUserName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Error state for each field
  const [usernameError, setUsernameError] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginUsernameError, setLoginUsernameError] = useState("");
  const [loginEmailError, setLoginEmailError] = useState("");
  const [loginPasswordError, setLoginPasswordError] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const signupSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error states before validation
    setUsernameError("");
    setFullnameError("");
    setEmailError("");
    setPasswordError("");

    try {
      await signupValidationSchema.validate({ username, fullname, email, password }, { abortEarly: false });
      const UserRegister = { profileImage, username, fullname, email, password };
      console.log("User data:", UserRegister);
    } catch (err) {
      err.inner.forEach((error) => {
        if (error.path === "username") setUsernameError(error.message);
        if (error.path === "fullname") setFullnameError(error.message);
        if (error.path === "email") setEmailError(error.message);
        if (error.path === "password") setPasswordError(error.message);
      });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error states before validation
    setLoginUsernameError("");
    setLoginEmailError("");
    setLoginPasswordError("");

    try {
      await loginValidationSchema.validate({ username: loginUserName, email: loginEmail, password: loginPassword }, { abortEarly: false });
      const loginData = { username: loginUserName, email: loginEmail, password: loginPassword };
      console.log("Login Data:", loginData);
    } catch (err) {
      err.inner.forEach((error) => {
        if (error.path === "username") setLoginUsernameError(error.message);
        if (error.path === "email") setLoginEmailError(error.message);
        if (error.path === "password") setLoginPasswordError(error.message);
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  return (
    <div className="main">
      {/* Left Section */}
      {isLogin ? (
        <div className="left-section">
          <div className="login-form">
            <div className="login">
              <h2 className="login-text">login</h2>
            </div>
            <form onSubmit={handleLoginSubmit}>
              <div className="username">
                <label htmlFor="username">User Name</label>
                <br />
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={loginUserName}
                  onChange={(e) => setLoginUserName(e.target.value)}
                />
                {loginUsernameError && <p className="error">{loginUsernameError}</p>}
              </div>
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
                {loginEmailError && <p className="error">{loginEmailError}</p>}
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
                {loginPasswordError && <p className="error">{loginPasswordError}</p>}
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
              {/* Profile Image Section */}
              <div className="profile-image-container">
                <div className="profile">
                  <label  className="profile-image-label">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    className="profile-image-input"
                    onChange={handleImageChange}
                  />
                </div>
                <label htmlFor="profileImage">
                  <div className="profile-image-wrapper">
                    {profileImage ? (
                      <img
                        src={URL.createObjectURL(profileImage)}
                        alt="Profile Preview"
                        className="profile-image-preview"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faCamera} className="camera-icon" />
                    )}
                  </div>
                </label>
              </div>

              {/* Input Fields */}
              <div className="username">
                <label htmlFor="username" className="input-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Username"
                  className="signup-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}

                />
                {usernameError && <p className="error">{usernameError}</p>}
              </div>
              <div className="fullname">
                <label htmlFor="fullname" className="input-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Enter Full Name"
                  className="signup-input"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}

                />
                {fullnameError && <p className="error">{fullnameError}</p>}
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

              {/* Submit Button */}
              <div className="submit-signup">
                <input type="submit" value="Signup" className="signup-button" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
