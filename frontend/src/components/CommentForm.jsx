import React, { useState } from 'react';

export default function CommentForm({ carId, customerId, onCommentAdded }) {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost/carshop/comments/create_comment.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ car_id: carId, customer_id: customerId, comment }),
    });

    const data = await response.json();
    if (data.message) {
      setComment('');
      onCommentAdded();
    } else {
      console.error(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment..."
        className="w-full p-2 border rounded mb-2"
        rows={3}
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Post Comment
      </button>
    </form>
  );
}
