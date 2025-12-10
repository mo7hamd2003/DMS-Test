const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:5024";

export async function fetchItems() {
  const res = await fetch(`${API_BASE}/api/testmodels`);
  if (!res.ok) throw new Error("Failed to load items");
  return res.json();
}

export async function createItem(payload) {
  const res = await fetch(`${API_BASE}/api/testmodels`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create item");
  return res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`${API_BASE}/api/testmodels/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete item");
}

