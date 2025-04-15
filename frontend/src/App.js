import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarList from './components/CarList';
import CarForm from './components/CarForm';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';

function App() {
  const [editingCar, setEditingCar] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (car) => setEditingCar(car);
  const handleSuccess = () => {
    setEditingCar(null);
    setRefresh(!refresh);
  };

  // === COMMENT state ===
  const [editingComment, setEditingComment] = useState(null);
  const [refreshComments, setRefreshComments] = useState(0);

  const handleEditComment = (comment) => setEditingComment(comment);
  const handleCommentSuccess = () => {
    setEditingComment(null);
    setRefreshComments((prev) => prev + 1);
  };

  // === CUSTOMER state ===
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [refreshCustomers, setRefreshCustomers] = useState(0);

  const handleEditCustomer = (customer) => setEditingCustomer(customer);
  const handleCustomerSuccess = () => {
    setEditingCustomer(null);
    setRefreshCustomers((prev) => prev + 1);
  };

  // 👇 KY `return` DUHET TË JETË BRENDA `App()`
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/car"
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
                <CommentForm commentToEdit={editingComment} onSuccess={handleCommentSuccess} />
                <CommentList onEdit={handleEditComment} key={refreshComments} />
              </>
            }
          />
          <Route
            path="/customers"
            element={
              <>
                <CustomerForm customerToEdit={editingCustomer} onSuccess={handleCustomerSuccess} />
                <CustomerList onEdit={handleEditCustomer} key={refreshCustomers} />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
