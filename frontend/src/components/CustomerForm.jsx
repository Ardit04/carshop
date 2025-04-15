import React, { useState } from 'react';

export default function CustomerForm({ onCustomerCreated }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost/carshop/customers/create_customer.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (data.message) {
      setName('');
      setEmail('');
      setPassword('');
      onCustomerCreated();
    } else {
      console.error(data.error);
    }
  };

  return (
    <form onSubmit={handleCreate} className="p-4 border rounded shadow">
      <h2 className="text-xl mb-2">Register New Customer</h2>
      <input className="block w-full p-2 mb-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input className="block w-full p-2 mb-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input className="block w-full p-2 mb-2 border rounded" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Create</button>
    </form>
  );
}
