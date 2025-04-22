import { useState } from "react";

export default function LoginForm() {
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

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`HTTP error! Status: ${res.status}, Response: ${errorText}`);
        setMessage(`Server error: ${res.status}. Please try again later.`);
        return;
      }

      const text = await res.text(); // Get raw response text
      console.log("Raw response:", text);

      try {
        const data = JSON.parse(text); // Parse JSON manually
        if (data.status === "success") {
          setUser(data.user);
          setMessage(`Welcome ${data.user.username}!`);
        } else {
          setMessage(data.message || "Login failed.");
        }
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        setMessage("Unexpected server response. Please try again.");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setMessage("An error occurred while connecting to the server. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 shadow-md rounded-xl space-y-3">
      <h2 className="text-xl font-semibold">Login</h2>
      <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" className="w-full border p-2 rounded" required />
      <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Password" className="w-full border p-2 rounded" required />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Login</button>
      {message && <p className="text-center text-sm text-gray-700 mt-2">{message}</p>}
    </form>
  );
}
