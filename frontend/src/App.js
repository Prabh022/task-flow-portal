import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [showRegister, setShowRegister] = useState(false);

  const handleSetToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  if (!token) {
    return (
      <div>
        <h1>TaskFlow Portal</h1>
        {showRegister ? (
          <div>
            <Register onRegistered={() => setShowRegister(false)} />
            <p>
              Already have an account?{" "}
              <button onClick={() => setShowRegister(false)}>Login</button>
            </p>
          </div>
        ) : (
          <div>
            <Login setToken={handleSetToken} />
            <p>
              No account yet?{" "}
              <button onClick={() => setShowRegister(true)}>Register</button>
            </p>
          </div>
        )}
      </div>
    );
  }

  return <Dashboard token={token} onLogout={logout} />;
}
