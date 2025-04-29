import React, { useState } from 'react';
import CarForm from './CarForm';

const CarManager = () => {
  const [carToEdit, setCarToEdit] = useState(null);

  const handleEdit = (car) => {
    setCarToEdit(car); // Set the car to be edited
  };

  const handleSuccess = () => {
    console.log('Car created/updated successfully!');
    setCarToEdit(null); // Clear the form after success
  };

  return (
    <div>
      <CarForm carToEdit={carToEdit} onSuccess={handleSuccess} onEdit={handleEdit} />
    </div>
  );
};

export default CarManager;