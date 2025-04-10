import React, { useEffect, useState } from 'react';
import { getCars, deleteCar } from '../api/carService';

const CarList = ({ onEdit }) => {
  const [cars, setCars] = useState([]);

  const loadCars = async () => {
    const data = await getCars();
    setCars(data);
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleDelete = async (id) => {
    await deleteCar(id);
    loadCars();
  };

  return (
    <div>
      <h2>Car List</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.brand} {car.model} - {car.year} (${car.price})
            <button onClick={() => onEdit(car)}>Edit</button>
            <button onClick={() => handleDelete(car.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
