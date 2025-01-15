import { useState } from "react";
import "./Login.css";
import { useAuth } from "../../Components/Guard/Guard";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const auth= useAuth()

  const handleCklickLogin = () => {
    setEmailError(false);
    setPasswordError(false);

    if (email === "admin@gmail.com" && password === "admin123") {
      auth.authorize();
    } else {
      if (email !== "admin") {
        setEmailError(true);
      }
      if (password !== "admin123") {
        setPasswordError(true);
      }
    }
  };

  return (
    <div className="main-container">
      <div className="card-container">
        <h1 className="loginHeader">Admin Panel login</h1>
        <div className="input-container">
          <p>
            <label>Email</label>
            <input
              type="email"
              placeholder=" Enter your email"
              value={email}
              onChange={(userEmail) => setEmail(userEmail.target.value)}
              required
              style={{ borderColor: emailError ? "red" : "" }}
            />
          </p>
          <p>
            <label>Password </label>
            <input
              type="password"
              placeholder=" Enter password"
              value={password}
              onChange={(userPassword) =>
                setPassword(userPassword.target.value)
              }
              required
              style={{ borderColor: passwordError ? "red" : "" }}
            />
          </p>
        </div>
        <div className="LoginButtonDiv">
          <button
            className="loginButton"
            onClick={handleCklickLogin}
            disabled={!email || !password}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;



