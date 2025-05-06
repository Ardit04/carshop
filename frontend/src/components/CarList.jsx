import React, { useEffect, useState } from 'react';
import { getCars } from '../api/carService';
import CommentForm from './CommentForm'; // Import the CommentForm component
import AddToCartButton from './AddToCartButton'; // Import the AddToCartButton component

const CarList = ({ user }) => { // Accept the user prop
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
            {/* Conditionally render the "Order Now" button for logged-in customers */}
            {user && user.role === 1 && (
              <AddToCartButton item={{ id: car.id, name: `${car.brand} ${car.model}`, price: car.price }} />
            )}
            {/* Conditionally render the CommentForm for logged-in customers */}
            {user && user.role === 1 && (
              <CommentForm
                userId={user.id} // Pass the logged-in user's ID
                onCommentAdded={(comment) => handleCommentAdded(car.id, comment)}
                carId={car.id} // Pass the car ID to the CommentForm
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
