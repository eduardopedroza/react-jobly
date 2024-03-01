import React, { useState, useEffect, createContext, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./MyRoutes";

import NavBar from "./NavBar";
import JoblyApi from "./api";
// import useLocalStorage from "./hooks/useLocalStorage";

export const UserContext = createContext();

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const decodedToken = jwtDecode(token);
          const username = decodedToken.username;
          const userData = await JoblyApi.getUser(username, token);
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [token, setUser]);

  const signup = async (userData) => {
    try {
      const newToken = await JoblyApi.registerNewUser(userData);
      setToken(newToken);
      setUser(userData);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const login = async (credentials) => {
    try {
      const { username, password } = credentials;
      const userToken = await JoblyApi.loginUser(username, password);
      setToken(userToken);
      const userData = await JoblyApi.getUser(username, userToken);
      setUser(userData);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    setToken("");
    setUser({});
  };

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={user}>
          <NavBar logout={logout} />
          <MyRoutes signup={signup} login={login} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
