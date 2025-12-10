import { useEffect, useState } from "react";
import { createItem, deleteItem, fetchItems } from "./api";

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setError("");
      const data = await fetchItems();
      setItems(data);
    } catch (err) {
      setError(err.message ?? "Failed to load items");
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      setLoading(true);
      setError("");
      const created = await createItem({ name, note });
      setItems((prev) => [created, ...prev]);
      setName("");
      setNote("");
    } catch (err) {
      setError(err.message ?? "Failed to create");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id) {
    try {
      setError("");
      await deleteItem(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (err) {
      setError(err.message ?? "Failed to delete");
    }
  }

  return (
    <div style={styles.page}>
      <h1>DMS Link Test</h1>
      <p style={styles.sub}>Backend: {import.meta.env.VITE_API_BASE ?? "http://localhost:5024"}</p>
      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={onSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={styles.input}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Saving..." : "Add"}
        </button>
        <button type="button" onClick={load} style={styles.secondary}>
          Reload
        </button>
      </form>

      <ul style={styles.list}>
        {items.map((item) => (
          <li key={item.id} style={styles.listItem}>
            <div>
              <strong>{item.name}</strong>
              {item.note ? <span style={styles.note}> — {item.note}</span> : null}
              <div style={styles.meta}>{new Date(item.createdAt).toLocaleString()}</div>
            </div>
            <button onClick={() => onDelete(item.id)} style={styles.delete}>
              Delete
            </button>
          </li>
        ))}
        {!items.length && <li style={styles.empty}>No items yet.</li>}
      </ul>
    </div>
  );
}

const styles = {
  page: { margin: "2rem auto", maxWidth: 720, fontFamily: "Inter, sans-serif" },
  sub: { color: "#555" },
  error: { background: "#ffecec", color: "#a00", padding: "0.75rem", borderRadius: 8, marginBottom: "1rem" },
  form: { display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center", marginBottom: "1rem" },
  input: { padding: "0.6rem 0.75rem", flex: "1 1 200px", borderRadius: 6, border: "1px solid #ccc" },
  button: { padding: "0.6rem 1rem", borderRadius: 6, border: "none", background: "#2563eb", color: "#fff", cursor: "pointer" },
  secondary: { padding: "0.6rem 1rem", borderRadius: 6, border: "1px solid #ccc", background: "#f4f4f5", cursor: "pointer" },
  list: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" },
  listItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1rem", border: "1px solid #e5e7eb", borderRadius: 8 },
  meta: { color: "#6b7280", fontSize: 12, marginTop: 4 },
  note: { color: "#374151" },
  delete: { border: "1px solid #ef4444", background: "#fee2e2", color: "#b91c1c", padding: "0.4rem 0.75rem", borderRadius: 6, cursor: "pointer" },
  empty: { color: "#6b7280" },
};

