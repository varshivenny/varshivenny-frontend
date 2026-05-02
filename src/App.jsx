import React, { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [tasks, setTasks] = useState([]);

  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupRole, setSignupRole] = useState("Member");

  useEffect(() => {
    if (token) {
      loadTasks();
    }
  }, [token]);

  const handleSignup = (e) => {
    e.preventDefault();
    alert("Signup successful! Please login.");
    setIsLoginView(true);
    setPassword("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      localStorage.setItem("token", "demo-token");
      localStorage.setItem("role", signupRole);

      setToken("demo-token");
      setRole(signupRole);

      alert("Login successful!");
    } else {
      alert("Please enter username and password.");
    }
  };

  const loadTasks = () => {
    setTasks([
      {
        id: 1,
        title: "Design Dashboard UI",
        status: "Pending",
      },
      {
        id: 2,
        title: "Develop Authentication Module",
        status: "In Progress",
      },
      {
        id: 3,
        title: "Deploy Frontend to Vercel",
        status: "Completed",
      },
    ]);
  };

  const updateTaskStatus = (id, status) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, status } : task
    );

    setTasks(updated);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setTasks([]);
    setUsername("");
    setPassword("");
  };

  if (!token) {
    return (
      <div
        style={{
          maxWidth: "420px",
          margin: "60px auto",
          padding: "30px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          fontFamily: "Arial",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
          {isLoginView ? "Login to Task Manager" : "Create Account"}
        </h2>

        <form
          onSubmit={isLoginView ? handleLogin : handleSignup}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          {!isLoginView && (
            <select
              value={signupRole}
              onChange={(e) => setSignupRole(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
          )}

          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {isLoginView ? "Login" : "Sign Up"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            style={{
              border: "none",
              background: "none",
              color: "#007bff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {isLoginView
              ? "Don't have an account? Sign up here."
              : "Already have an account? Log in."}
          </button>
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h2>Task Dashboard ({role})</h2>

        <button
          onClick={logout}
          style={{
            padding: "10px 18px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "18px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <h3>{task.title}</h3>

            <p>
              Status: <strong>{task.status}</strong>
            </p>

            <select
              value={task.status}
              onChange={(e) =>
                updateTaskStatus(task.id, e.target.value)
              }
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
              }}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
