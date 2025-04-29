import React, { useState, useEffect } from 'react';
import { createCar, updateCar, deleteCar, getCars } from '../api/carService';

const initialForm = { brand: '', model: '', year: '', price: '' };

const CarForm = ({ carToEdit, onSuccess, onEdit }) => {
  const [form, setForm] = useState(initialForm);
  const [cars, setCars] = useState([]); // State to hold the list of cars

  useEffect(() => {
    if (carToEdit) setForm(carToEdit);
  }, [carToEdit]);

  useEffect(() => {
    loadCars(); // Load cars when the component mounts
  }, []);

  const loadCars = async () => {
    const data = await getCars();
    setCars(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.id) {
      await updateCar(form.id, form);
    } else {
      await createCar(form);
    }

    setForm(initialForm);
    if (onSuccess) onSuccess(); // Ensure onSuccess is called if it exists
    loadCars(); // Refresh the car list
  };

  const handleDelete = async (id) => {
    await deleteCar(id);
    if (onSuccess) onSuccess(); // Ensure onSuccess is called if it exists
    loadCars(); // Refresh the car list after deletion
  };

  const handleEditClick = (car) => {
    if (typeof onEdit === 'function') {
      onEdit(car); // Call the onEdit function passed from the parent
    } else {
      console.error('onEdit is not a function');
    }
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
      <div>
        <h2>Car List</h2>
        <ul>
          {cars.map((car) => (
            <li key={car.id}>
              {car.brand} {car.model} - {car.year} (${car.price})
              <button type="button" onClick={() => handleEditClick(car)}>
                Edit
              </button>
              <button type="button" onClick={() => handleDelete(car.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default CarForm;
