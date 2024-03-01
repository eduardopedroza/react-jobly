import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import { UserContext } from "./App";

function NavBar({ logout }) {
  const user = useContext(UserContext);
  console.log(user);

  return (
    <div>
      <Navbar expand="md">
        <NavLink to="/" className="navbar-brand">
          Jobly
        </NavLink>

        <Nav>
          <NavItem>
            <NavLink to="/companies">Companies</NavLink>
          </NavItem>
        </Nav>
        <Nav>
          <NavItem>
            <NavLink to="/jobs">Jobs</NavLink>
          </NavItem>
        </Nav>
        {user ? (
          <>
            <Nav>
              <NavItem>
                <NavLink to="/profile">Profile</NavLink>
              </NavItem>
            </Nav>
            <Nav>
              <NavItem>
                <NavLink to="/" onClick={logout}>
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
            <Nav>
              <NavItem>
                <span className="navbar-text">Welcome, {user.username}</span>
              </NavItem>
            </Nav>
          </>
        ) : (
          <>
            <Nav>
              <NavItem>
                <NavLink to="/signup">Sign Up</NavLink>
              </NavItem>
            </Nav>
            <Nav>
              <NavItem>
                <NavLink to="/login">Log In</NavLink>
              </NavItem>
            </Nav>
          </>
        )}
      </Navbar>
    </div>
  );
}

export default NavBar;
