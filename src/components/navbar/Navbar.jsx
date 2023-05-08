import React from "react";
import SearchBar from '../SearchBar/SearchBar'
import {  NavLink } from 'react-router-dom'
export default function Navbar({onSearch, agregar}) {
    return (
        <div>
            <SearchBar onSearch = {onSearch} />
            <button> <NavLink to = '/'> Logout </NavLink>   </button>
            <button onClick = { agregar }> Aleatorio </button>
            <button> <NavLink to = '/about'> About </NavLink>  </button>   
            <button> <NavLink to =  '/home'> Home </NavLink>  </button>
            <button> <NavLink to = '/favorites'>Favorites</NavLink></button>
        </div>
    )
}