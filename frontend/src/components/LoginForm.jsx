import React from "react";
import { useState } from "react";

export default function LoginForm({ onLogin }) { // Accept onLogin as a prop
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages
    try {
      const res = await fetch("http://localhost/carshop/backend/api/auth/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.status === "success") {
        setUser(data.user);
        setMessage(`Welcome ${data.user.username}!`);
        onLogin(data.user); // Call onLogin to update the user state in App.js
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setMessage("An error occurred while connecting to the server. Please try again.");
    }
  };

  return (
    <div>
      {!user ? (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 shadow-md rounded-xl space-y-3 ">
          <h2 className="text-xl font-semibold">Login</h2>
          <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" className="w-full border p-2 rounded" required />
          <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Password" className="w-full border p-2 rounded" required />
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Login</button>
          {message && <p className="text-center text-sm text-gray-700 mt-2">{message}</p>}
        </form>
      ) : (
        <div>
          <h2 className="text-xl font-semibold">Welcome, {user.username}!</h2>
          {user.role === "1" && (
            <div>
              <p>You have access to:</p>
              <ul>
                <li>Car List</li>
                <li>Comment Form</li>
              </ul>
            </div>
          )}
          {user.role === "0" && (
            <div>
              <p>You have access to:</p>
              <ul>
                <li>Car Form</li>
                <li>Comment List</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
