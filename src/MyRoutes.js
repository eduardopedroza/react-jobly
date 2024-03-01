import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyCard";
import JobList from "./JobList";
import SignUpForm from "./SignupForm";
import LogInForm from "./LoginForm";
import Profile from "./Profile";

function MyRoutes({ signup, login }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/companies" element={<CompanyList />} />
      <Route path="/company/:name" element={<CompanyDetail />} />
      <Route path="/jobs" element={<JobList />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signup" element={<SignUpForm signup={signup} />} />
      <Route path="/login" element={<LogInForm login={login} />} />
    </Routes>
  );
}

export default MyRoutes;
