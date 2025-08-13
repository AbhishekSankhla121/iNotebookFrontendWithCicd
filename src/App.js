
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Auth/Register'
import Profile from "./components/Profile/Profile"
import Navbar from './components/Header/Navbar/Navbar'
import Home from "./components/Home/Home"
import './components/Header/Navbar/nav.css'
import './App.css'
import Login from './components/Auth/login'
import Alert from './components/Alert/Alert'


function App() {


  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Alert />
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/register"} element={<Register />} />
          <Route exact path={"/profile"} element={<Profile />} />
          <Route exact path={"/login"} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
