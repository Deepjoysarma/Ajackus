import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./UserList";
import UserForm from "./UserForm";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<UserList />} />
      {/* <Route path="/add" element={<UserForm />} /> */}
      <Route path="/edit/:id" element={<UserForm />} />
    </Routes>
  </Router>
);

export default App;
