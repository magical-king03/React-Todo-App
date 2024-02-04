import React from 'react';
import AddTodo from "./AddTodo";
import Nav from "./Nav";
import Login from "./Login";
import Register from "./Register";
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div>
      <div>
        <Nav />
      </div>
      <Routes>
        <Route path="/" element={<AddTodo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </div>
  );
}

export default App;
