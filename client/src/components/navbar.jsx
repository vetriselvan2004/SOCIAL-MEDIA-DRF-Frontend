import React from "react";
import "./navbar.css"; // Import the CSS file
import Home from '.././assets/Home.svg'
import Search from '.././assets/Search.svg'
import Settings from '../assets/settings.svg'
import Newpost from '.././assets/Plus.svg'
import Profile from '.././assets/person.svg'
import Menu from '.././assets/Menu.svg'
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const nav = useNavigate();

    const handleNavigate = (route) => {
        nav(`/${route}`)
    }

    const handleNavigateUser = () => {
        const username = JSON.parse(localStorage.getItem('userData'))['username']
        nav(`/${username}`)
        window.location.reload();
    }
    return (
   <>
   <div className="nav-container">
    <a onClick={(route) => handleNavigate('')} >
    <div className="ul">
        <img src={Home}/>
        <p>Home</p>
    </div>
        </a>
        <a onClick={(route) => handleNavigate('search')}>
    <div className="ul">
        <img src={Search}/>
        <p>Search</p>
    </div>
    </a>
    <a  onClick={(route) => handleNavigate('create/post')}>
    <div className="ul">
        <img src={Newpost}/>
        <p>Newpost</p>
    </div>
    </a>
    <a onClick={handleNavigateUser}>
    <div className="ul">
        <img src={Profile}/>
        <p>Profile</p>
    </div>
    </a >
    <a onClick={(route) => handleNavigate('settings')}>
    <div className="ul">
        <img src={Settings}/>
        <p>Settings</p>
    </div>
    </a>
   </div> 
   </>
  );
};

export default Navbar;