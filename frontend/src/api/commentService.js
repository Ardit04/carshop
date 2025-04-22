const BASE_URL = 'http://localhost/carshop/backend/api/comments';

export const getComments = async (userId) => {
    const response = await fetch(`http://localhost/carshop/backend/api/comments/index_comment.php?user_id=${userId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const createComment = async (comment) => {
  const res = await fetch(`${BASE_URL}/create.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  });
  return res.json();
};

export const updateComment = async (id, text) => {
  const res = await fetch(`${BASE_URL}/update.php?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return res.json();
};

export const deleteComment = async (id) => {
  const res = await fetch(`${BASE_URL}/delete.php?id=${id}`, {
    method: 'DELETE',
  });
  return res.json();
};
