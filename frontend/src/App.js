import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarList from './components/CarList';
import CarForm from './components/CarForm';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

function App() {
  // === CAR state ===
  const [editingCar, setEditingCar] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (car) => setEditingCar(car);
  const handleSuccess = () => {
    setEditingCar(null);
    setRefresh(!refresh);
  };

  // === COMMENT state ===
  const [comments, setComments] = useState([]); // Shared state for comments

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]); // Add new comment to the list
  };

  return (
    <Router>
      <div className="App p-4">
        <Routes>
          <Route
            path="/cars"
            element={
              <>
                <CarForm carToEdit={editingCar} onSuccess={handleSuccess} />
                <CarList onEdit={handleEdit} key={refresh} />
              </>
            }
          />
          <Route
            path="/comments"
            element={
              <>
                <CommentForm userId={1} onCommentAdded={handleCommentAdded} />
                <CommentList userId={1} comments={comments} />
              </>
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
