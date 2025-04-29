import React, { useEffect, useState } from 'react';
import { getCars, } from '../api/carService';

const CarList = ({ }) => {
  const [cars, setCars] = useState([]);

  const loadCars = async () => {
    const data = await getCars();
    setCars(data);
  };

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <div>
      <h2>Car List</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
          {car.brand} {car.model} - {car.year} (${car.price}) 
        </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
