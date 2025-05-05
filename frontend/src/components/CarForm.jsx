import React, { useState, useEffect } from 'react';
import { createCar, updateCar } from '../api/carService';

const initialForm = { brand: '', model: '', year: '', price: '' };

const CarForm = ({ carToEdit, onSuccess }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (carToEdit) {
      setForm({
        id: carToEdit.id ?? '',
        brand: carToEdit.brand ?? '',
        model: carToEdit.model ?? '',
        year: carToEdit.year ?? '',
        price: carToEdit.price ?? '',
      });
    } else {
      setForm(initialForm);
    }
  }, [carToEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.id && form.id !== '') {
      await updateCar(form.id, form);
    } else {
      await createCar(form);
    }

    setForm(initialForm);
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{form.id ? 'Edit' : 'Add'} Car</h2>
      <input
        name="brand"
        placeholder="Brand"
        value={form.brand}
        onChange={handleChange}
        required
      />
      <input
        name="model"
        placeholder="Model"
        value={form.model}
        onChange={handleChange}
        required
      />
      <input
        name="year"
        placeholder="Year"
        value={form.year}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />
      <button type="submit">{form.id ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default CarForm;
