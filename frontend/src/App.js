import React, { useState } from 'react';
import CarList from './components/CarList';
import CarForm from './components/CarForm';

function App() {
  const [editingCar, setEditingCar] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (car) => setEditingCar(car);
  const handleSuccess = () => {
    setEditingCar(null);
    setRefresh(!refresh);
  };

  return (
    <div className="App">
      <CarForm carToEdit={editingCar} onSuccess={handleSuccess} />
      <CarList onEdit={handleEdit} key={refresh} />
    </div>
  );
}

export default App;
