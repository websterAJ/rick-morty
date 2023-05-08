import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate  } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import './App.css';
import axios from 'axios'

export default function App() {
  
let location = useLocation();
const navigate = useNavigate();
let [characters, setCharacters] = useState([]);
let [access, setAccess] = useState(false);

 async function login(userData) {

      try {
         const {email, password } = userData;
         const URL = 'http://localhost:3001/api/login';
         const { data } = await axios()  
         const { access } = data
         setAccess(access);
      access && navigate('/home');
   
      } catch (error) {
         console.log(error.message);
         
      }   
   }
      useEffect(() => {
      !access && navigate('/');
   
    }, [access, navigate]);


  let onSearch = async (id) =>  {
    try {
      const { data } = await axios(`http://localhost:3001/api/character/${id}`)
      if (data.name ) {
        setCharacters((oldChars) => [...oldChars, data])
      }
    }catch (error) {
      alert('¡No hay personajes con este ID!')
    }
  }

  let onClose = (id) =>{
    const characterFilter = characters.filter( character =>character.id !== id)
    setCharacters(characterFilter)
  }
    
  let agregar = () => {
    let a=1;
    let b=827;
    let n = (a+Math.floor(Math.random()*b));

    axios(`http://localhost:3001/api/character/${n}`)
      .then(response => response.data)
      .then((data) => {
          if (data.name) {
            setCharacters((oldChars) => [...oldChars, data])
          }else {
            alert('¡No hay personajes con este ID!');
          }
      });
  }
  return (
    <div className="App">
            <div className="titulo"> Rick <span>and</span> Morty </div>
            <div className="titulo middle"> Rick <span>and</span> Morty </div>
            <div className="titulo bottom"> Rick <span>and</span> Morty </div>
            {
                location.pathname !== '/' ?
                <Navbar onSearch = {onSearch} agregar = {agregar}/>
                :
                null
            }
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Form login = {login}  />}/>
          <Route path = '/home' element = {<Cards characters={characters} onClose = {onClose} /> } />
          <Route path = '/about' element = {<About/>} />
          <Route path = '/detail/:id' element = {<Detail/> } />
          <Route path='/favorites' element = {<Favorites/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

