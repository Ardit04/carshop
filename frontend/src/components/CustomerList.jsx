import React, { useEffect, useState } from 'react';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const loadCustomers = async () => {
    const res = await fetch('http://localhost/carshop/customers/read_customers.php');
    const data = await res.json();
    setCustomers(data);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost/carshop/customers/delete_customer.php?id=${id}`, { method: 'DELETE' });
    loadCustomers();
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost/carshop/customers/update_customer.php`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, id: editingId }),
    });
    setEditingId(null);
    setFormData({ name: '', email: '', password: '' });
    loadCustomers();
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Customers</h2>
      {customers.map((c) => (
        <div key={c.id} className="border-b py-2">
          {editingId === c.id ? (
            <>
              <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="block border mb-1 p-1" />
              <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="block border mb-1 p-1" />
              <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="block border mb-2 p-1" />
              <button onClick={handleUpdate} className="bg-green-600 text-white px-2 py-1 mr-2">Save</button>
              <button onClick={() => setEditingId(null)} className="bg-gray-300 px-2 py-1">Cancel</button>
            </>
          ) : (
            <>
              <p><strong>{c.name}</strong> – {c.email}</p>
              <button className="text-blue-600 mr-2" onClick={() => {
                setEditingId(c.id);
                setFormData({ name: c.name, email: c.email, password: '' });
              }}>Edit</button>
              <button className="text-red-600" onClick={() => handleDelete(c.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
