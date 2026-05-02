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
      fetchTasks();
    }
  }, [token]);

  // ---------------- SIGNUP ----------------
  const handleSignup = (e) => {
    e.preventDefault();

    alert("Signup successful! Please login now.");
    setIsLoginView(true);
    setPassword("");
  };

  // ---------------- LOGIN ----------------
  const handleLogin = (e) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      setToken("demo-token");
      setRole(signupRole || "Admin");

      localStorage.setItem("token", "demo-token");
      localStorage.setItem("role", signupRole || "Admin");
    } else {
      alert("Please enter username and password.");
    }
  };

  // ---------------- TASKS ----------------
  const fetchTasks = () => {
    setTasks([
      {
        id: 1,
        title: "Design Project Dashboard",
        status: "Pending",
      },
      {
        id: 2,
        title: "Complete Frontend Development",
        status: "In Progress",
      },
      {
        id: 3,
        title: "Deploy Application",
        status: "Completed",
      },
    ]);
  };

  const updateStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    setTasks(updatedTasks);
  };

  // ---------------- LOGOUT ----------------
  const logout = () => {
    setToken(null);
    setRole(null);
    setTasks([]);

    localStorage.clear();

    setUsername("");
    setPassword("");
  };

  // ---------------- LOGIN / SIGNUP SCREEN ----------------
  if (!token) {
    return (
      <div
        style={{
          padding: "2rem",
          maxWidth: "400px",
          margin: "50px auto",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          fontFamily: "Arial",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
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
              borderRadius: "5px",
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
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          {!isLoginView && (
            <select
              value={signupRole}
              onChange={(e) => setSignupRole(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "5px",
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
              padding: "10px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isLoginView ? "Login" : "Sign Up"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
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
              : "Already have an account? Login here."}
          </button>
        </div>
      </div>
    );
  }

  // ---------------- DASHBOARD ----------------
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #eee",
          paddingBottom: "15px",
        }}
      >
        <h2>
          Dashboard ({role})
        </h2>

        <div>
          <span style={{ marginRight: "15px", fontWeight: "bold" }}>
            Welcome, {username}
          </span>

          <button
            onClick={logout}
            style={{
              padding: "8px 15px",
              background: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <h3 style={{ marginTop: "30px" }}>Your Tasks</h3>

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
              padding: "15px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            <h4>{task.title}</h4>

            <p>
              Status: <strong>{task.status}</strong>
            </p>

            <select
              value={task.status}
              onChange={(e) =>
                updateStatus(task.id, e.target.value)
              }
              style={{
                width: "100%",
                padding: "8px",
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
