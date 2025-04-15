import React, { useEffect, useState } from 'react';

export default function CommentList({ carId }) {
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [updatedText, setUpdatedText] = useState('');

  const loadComments = async () => {
    const response = await fetch(`http://localhost/carshop/comments/read_comments.php?car_id=${carId}`);
    const data = await response.json();
    setComments(data);
  };

  useEffect(() => {
    loadComments();
  }, [carId]);

  const handleDelete = async (id) => {
    await fetch(`http://localhost/carshop/comments/delete_comment.php?id=${id}`, { method: 'DELETE' });
    loadComments();
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost/carshop/comments/update_comment.php`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingComment, comment: updatedText }),
    });
    setEditingComment(null);
    setUpdatedText('');
    loadComments();
  };

  return (
    <div className="mt-4">
      <h3 className="font-semibold text-lg mb-2">Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((c) => (
          <div key={c.id} className="border-b py-2">
            <strong>{c.customer_name}</strong>
            {editingComment === c.id ? (
              <>
                <textarea
                  className="w-full border mt-1 mb-2 p-1"
                  value={updatedText}
                  onChange={(e) => setUpdatedText(e.target.value)}
                />
                <button className="bg-green-500 text-white px-2 py-1 mr-2" onClick={handleUpdate}>Save</button>
                <button className="bg-gray-300 px-2 py-1" onClick={() => setEditingComment(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>{c.comment}</p>
                <small className="text-gray-500">{new Date(c.created_at).toLocaleString()}</small>
                <div className="mt-2">
                  <button className="text-blue-600 mr-2" onClick={() => {
                    setEditingComment(c.id);
                    setUpdatedText(c.comment);
                  }}>Edit</button>
                  <button className="text-red-600" onClick={() => handleDelete(c.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
