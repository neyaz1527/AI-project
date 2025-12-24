import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  };

  const addUser = () => {
    fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    })
      .then(() => {
        setName("");
        setEmail("");
        loadUsers();
      })
      .catch((err) => console.error(err));
  };

  const deleteUser = (id) => {
    fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
    })
      .then(() => loadUsers())
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users</h1>

      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={addUser}>Add User</button>

      <hr />

      {users.length === 0 && <p>No users found</p>}

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.id} - {u.name} — {u.email}
            <button
              onClick={() => deleteUser(u.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
