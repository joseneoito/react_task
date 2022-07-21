import React from 'react'
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
    Link
} from "react-router-dom";
import Users from './views/Users'
import UserDetails from './views/UserDetails'
import Home from './views/Home'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/users" element={<Users/>}/>
      <Route exact path="/user/:id" element={<UserDetails/>}/>
      <Route exact path="/users/create" element={<UserDetails/>}/>
    </Routes>
  );
}

export default App;
