import React, { useState, useContext } from "react";
import { UserContext } from "./App";
import JoblyApi from "./api";

function Profile() {
  const user = useContext(UserContext);

  const INITIAL_STATE = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      let updatedUser = await JoblyApi.updateUser(user.username, formData);
      // updateUserContext(updatedUser);
    } catch (e) {
      console.error("Error updating user:", e);
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input id="username" name="username" value={user.username} disabled />
        <input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          name="firstName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <button>Save Changes</button>
      </form>
    </div>
  );
}

export default Profile;
