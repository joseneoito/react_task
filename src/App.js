import React, {Suspense} from 'react'
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
    Navigate,
    Link
} from "react-router-dom";
const Users = React.lazy(() => import('./views/Users'));
const UserDetails = React.lazy(() => import('./views/UserDetails'))
const ButtonAppBar =React.lazy(()=> import("./components/Navbar"))
const Loading = React.lazy(()=> import('./components/Loading'))
function App() {
  return (
    <>
        <Suspense fallback={<Loading />}>
        <ButtonAppBar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/users" />} />
          <Route exact path="/users" element={<Users/>}/>
          <Route exact path="/user/:id" element={<UserDetails/>}/>
          <Route exact path="/users/create" element={<UserDetails/>}/>
        </Routes>
        </Suspense>
    </>
      );
}

export default App;
