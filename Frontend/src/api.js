const API = 'https://queue-management-6cgk.onrender.com';

async function joinQueue(name, phone) {
  const res = await fetch(`${API}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone }),
  });
  return await res.json();

}

async function getServing() {
  const res = await fetch(`${API}/serving`);
  return await res.json();
}

async function getStatus(id) {
  const res = await fetch(`${API}/${id}`);
  return await res.json();
}

export { joinQueue, getServing, getStatus };
