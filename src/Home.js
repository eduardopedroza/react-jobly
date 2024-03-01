import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./App";

function Home() {
  const user = useContext(UserContext);
  console.log(user);
  return (
    <div className="Home">
      <h1>Jobly</h1>
      {user ? (
        <>
          <p>Welcome back, {user.firstName}</p>
        </>
      ) : (
        <>
          <p>Find your dream job with Jobly!</p>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </div>
  );
}

export default Home;
