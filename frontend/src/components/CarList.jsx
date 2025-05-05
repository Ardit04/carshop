import React, { useEffect, useState } from 'react';
import { getCars } from '../api/carService';
import CommentForm from './CommentForm'; // Import the CommentForm component

const CarList = () => {
  const [cars, setCars] = useState([]);

  const loadCars = async () => {
    const data = await getCars();
    setCars(data);
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleCommentAdded = (carId, comment) => {
    console.log(`New comment added for car ${carId}:`, comment);
    // Optionally, update the UI or state here if needed
  };

  return (
    <div>
      <h2>Car List</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            <div>
              {car.brand} {car.model} - {car.year} (${car.price})
            </div>
            {/* Render the CommentForm for each car */}
            <CommentForm
              userId={1} // Replace with the logged-in user's ID
              onCommentAdded={(comment) => handleCommentAdded(car.id, comment)}
              carId={car.id} // Pass the car ID to the CommentForm
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
