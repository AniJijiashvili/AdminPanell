import { useState, useEffect } from "react";
import "./UserPage.css";
import { Search } from "@mui/icons-material";

interface User {
  id: number;
  firstName: string;
  email: string;
  age: number;
  role: string;
}

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [editId, setEditId] = useState<number | null>(null);
  const [editDetails, setEditDetails] = useState<User | null>(null);
  const [deleteId, setDeleteId] = useState<Set<number>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);

  const [addUserPopup, setAddUserPopup] = useState(false);
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    firstName: "",
    email: "",
    age: 0,
    role: "",
  });

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim().length < 2) {
        fetch(
          `https://dummyjson.com/users?limit=${limit}&skip=${
            (page - 1) * limit
          }`
        )
          .then((res) => res.json())
          .then((data) => {
            const users = data.users.map((user: any) => ({
              id: user.id,
              firstName: user.firstName,
              email: user.email,
              age: user.age,
              role: user.role,
            }));
            const filtered = users.filter(
              (user: User) => !deleteId.has(user.id)
            );
            setUsers(filtered);
            setFilteredUsers(filtered);
          });
      } else {
        fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
          .then((res) => res.json())
          .then((data) => {
            const users = data.users.map((user: any) => ({
              id: user.id,
              firstName: user.firstName,
              email: user.email,
              age: user.age,
              status: user.role,
            }));
            const filtered = users.filter(
              (user: User) => !deleteId.has(user.id)
            );
            setFilteredUsers(filtered);
          });
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, deleteId, limit, page]);

  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(lowerSearchTerm) ||
        user.email.toLowerCase().includes(lowerSearchTerm)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);
  const edit = (user: User) => {
    setEditId(user.id);
    setEditDetails(user);
    setModalOpen(true);
  };
  const change = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof User
  ) => {
    if (editDetails) {
      setEditDetails({
        ...editDetails,
        [field]: e.target.value,
      });
    }
  };
  const save = () => {
    if (editDetails) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editDetails.id ? { ...user, ...editDetails } : user
        )
      );
      setModalOpen(false);
      setEditId(null);
      setEditDetails(null);
    }
  };
  const cancel = () => {
    setModalOpen(false);
    setEditId(null);
    setEditDetails(null);
  };
  const deleteFunction = (id: number) => {
    setDeleteId((deleted) => {
      const updatedDeleted = new Set(deleted.add(id));
      setFilteredUsers(users.filter((user) => !updatedDeleted.has(user.id)));
      return updatedDeleted;
    });
  };

  const addUser = () => {
    const newUserId = users.length > 0 ? users[0].id + 1 : 1; 
    const newUserWithId = { id: newUserId, ...newUser };

    setUsers((prevUsers) => [newUserWithId, ...prevUsers]);
    setFilteredUsers((prevFilteredUsers) => [
      newUserWithId,
      ...prevFilteredUsers,
    ]);
    setNewUser({ firstName: "", email: "", age: 0, role: "" });
    setAddUserPopup(false);
  };

  return (
    <div className="user-container">
      <div className="searchContainer">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search for users(e.g., name) "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="search-icon"
            onClick={() => {
              const lowerSearchTerm = searchTerm.toLowerCase();
              const filtered = users.filter(
                (user) =>
                  user.firstName.toLowerCase().includes(lowerSearchTerm) ||
                  user.email.toLowerCase().includes(lowerSearchTerm)
              );
              setFilteredUsers(filtered);
            }}
          />
        </div>
      </div>
      <button onClick={() => setAddUserPopup(true)} className="add-user-btn">
        Add User
      </button>
      <div className="user-title">
        <p>First Name</p>
        <p>Email</p>
        <p>Age</p>
        <p>Status</p>
        <p>Actions</p>
      </div>
      {filteredUsers.map((user, index) => (
        <div
          className="user-details"
          key={user.id}
          style={{
            backgroundColor: index % 2 === 0 ? "white" : "rgb(238, 234, 234)",
          }}
        >
          <p className="user-details--firstname">{user.firstName}</p>
          <p className="user-details--email">{user.email}</p>
          <p className="user-details--age">{user.age}</p>
          <p className="user-details--status">{user.role}</p>
          <div className="user-action">
            <button className="user-action--edit" onClick={() => edit(user)}>
              Edit
            </button>
            <button
              className="user-action--delete"
              onClick={() => deleteFunction(user.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <div className="pagination-controls">
        <button
          className="previus"
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="Next"
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          Next
        </button>
      </div>
      {modalOpen && editDetails && (
         <div className="popup">
           <h2>Edit User</h2>           <div className="popup-content">
             <input
              type="text"
              value={editDetails.firstName}
              onChange={(e) => change(e, "firstName")}
            />
            <input
              type="email"
              value={editDetails.email}
              onChange={(e) => change(e, "email")}
            />
            <input
              type="number"
              value={editDetails.age}
              onChange={(e) => change(e, "age")}
            />
            <input
              type="text"
              value={editDetails.role}
              onChange={(e) => change(e, "role")}
            />
          </div>
          <div className="popup-btns">
            <button className="savechanges" onClick={save}>
              Save changes
            </button>
            <button className="cancelchanges" onClick={cancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {addUserPopup && (
        <div className="popup">
          <h2>Add User</h2>
          <div className="popup-content">
            <input
              type="text"
              placeholder="Name"
              value={newUser.firstName}
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Age"
              value={newUser.age}
              onChange={(e) =>
                setNewUser({ ...newUser, age: parseInt(e.target.value, 10) })
              }
            />
            <input
              type="text"
              placeholder="Status"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            />
          </div>
          <div className="popup-btns">
            <button onClick={addUser} className="savechanges">Add</button>
            <button onClick={() => setAddUserPopup(false) } className="cancelchanges">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;

