import React from 'react'
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
    Navigate,
    Link
} from "react-router-dom";
import Users from './views/Users'
import UserDetails from './views/UserDetails'
import ButtonAppBar from "./components/Navbar";
function App() {
  return (
    <>
        <ButtonAppBar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/users" />} />
          <Route exact path="/users" element={<Users/>}/>
          <Route exact path="/user/:id" element={<UserDetails/>}/>
          <Route exact path="/users/create" element={<UserDetails/>}/>
        </Routes>
    </>
      );
}

export default App;
