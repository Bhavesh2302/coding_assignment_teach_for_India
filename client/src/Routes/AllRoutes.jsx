import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import VolunteerForm from "../Pages/VolunteerForm";
import VolunteerList from "../Pages/VolunteerList";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/volunteer" element={<VolunteerForm />} />
      <Route path="/list" element={<VolunteerList />} />
    </Routes>
  );
};

export default AllRoutes;
