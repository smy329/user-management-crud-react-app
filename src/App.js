import React, {useState, useEffect} from 'react';
import './App.css';
import UserForm from './Components/UserForm';

const URL = "https://rest-api-without-db.herokuapp.com/users"

function App() {
    const [users, setUsers] = useState(null)
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    //upadate
    const [selectedUser, setSelectedUser] = useState({
        username: '',
        email: ''
    })
    const [updateFlag, setUpdateFlag] = useState(false);
    const [selectedUserId, setSetSelectedUserId] = useState('');

    const getAllUsers = () => {
        fetch(URL)
          .then((res) => {
            if (!res.ok) {
              throw Error("Could not fetch data");
            }
            return res.json();
          })
          .then((data) => {
            console.log(data.users);
            setUsers(data.users);
          })
          .catch((err) => {
            setError(err.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    //delete user
    const handleDelete = (id) => {
        fetch(URL + `/${id}`, {
            method: 'DELETE'
        })
          .then((res) => {
            if (!res.ok) {
              throw Error("Could not delete data");
            }
            getAllUsers()
          })
          .catch((err) => {
            setError(err.message);
          })
    }

    const addUser = (user) => {
        fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user)
        })
          .then((res) => {
            if (res.status === 201) {
              getAllUsers()
            } else {
                throw new Error("Failed to create new user")
            }
          })
          .catch((err) => {
            setError(err.message);
          });
    }

    const handleEdit = (id) => {
        setSetSelectedUserId(id)
        setUpdateFlag(true)
        const filteredData = users.filter((user) => user.id === id)
        setSelectedUser({
            username: filteredData[0].username,
            email: filteredData[0].email
        })
    }

    const handleUpdate = (user) => {
        fetch(URL + `/${selectedUserId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => {
            if (!res.ok) {
              throw Error("Could not update data");
            }
            getAllUsers();
            setUpdateFlag(false)
          })
          .catch((err) => {
            setError(err.message);
          });
    }

  return (
    <div className="App">
      <h1> User Management App </h1>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}

      {updateFlag ? (
        <UserForm
          btnText="Edit User"
          selectedUser={selectedUser}
          handleSubmitData={handleUpdate}
        />
      ) : (
                  <UserForm
                      btnText="Add User"
                      handleSubmitData={addUser}
                  />
      )}

      <section>
        {users &&
          users.map((user) => {
            return (
              <article className="card" key={user.id}>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <button
                  className="btn"
                  onClick={() => {
                    handleEdit(user.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    handleDelete(user.id);
                  }}
                >
                  Delete
                </button>
              </article>
            );
          })}
      </section>
    </div>
  );
}

export default App;
