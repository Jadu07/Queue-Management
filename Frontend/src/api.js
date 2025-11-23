const API = 'http://localhost:4000';
// const API = 'https://queue-management-6cgk.onrender.com'

async function joinQueue(name, phone, businessId) {
  const url = businessId ? `${API}/join/${businessId}` : `${API}/`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone }),
  });
  return await res.json();

}

async function getServing(businessId) {
  const url = businessId ? `${API}/serving/${businessId}` : `${API}/serving`;
  const res = await fetch(url);
  return await res.json();
}

async function getStatus(id) {
  const res = await fetch(`${API}/${id}`);
  return await res.json();
}

async function getBusinessDetails(businessId) {
  const res = await fetch(`${API}/business/${businessId}`);
  return await res.json();
}

export { joinQueue, getServing, getStatus, getBusinessDetails };
