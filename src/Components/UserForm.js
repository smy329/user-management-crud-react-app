import React, {useEffect} from 'react'
//import defaultProps from 'prop-types'
import { useState } from 'react'

const UserForm = ({ handleSubmitData, btnText, selectedUser }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
    
    useEffect(() => {
        setUser({
            username: selectedUser.username,
            email: selectedUser.email
      })
    }, [selectedUser])
    

  const handleChange = (e) => {
    const selectedField = e.target.name;
    const selectedValue = e.target.value;
    setUser((prevState) => {
      return { ...prevState, [selectedField]: selectedValue };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      handleSubmitData(user);
      setUser({
          username: '',
          email: ''
      })
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="field-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
        />{" "}
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>
      <button className="btn" type="submit">
        {btnText}
      </button>
    </form>
  );
};

UserForm.defaultProps = {
    selectedUser: {
        username: '',
        email: ''
    }
}

export default UserForm