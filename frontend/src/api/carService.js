const BASE_URL = 'http://localhost/carshop/backend/api/cars';

export const getCars = async () => {
  const data = await fetch(`${BASE_URL}/index.php`);
  const res = await data.json();
//   console.log('fffff', res);
  return res;
};

export const createCar = async (car) => {
  const res = await fetch(`${BASE_URL}/create.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  return res.json();
};

export const updateCar = async (id, car) => {
  const res = await fetch(`${BASE_URL}/update.php?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  return res.json();
};

export const deleteCar = async (id) => {
  const res = await fetch(`${BASE_URL}/delete.php?id=${id}`, {
    method: 'DELETE',
  });
  return res.json();
};
