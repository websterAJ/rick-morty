import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "../../components/header/header";
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard">
            {/*<Dashboard />*/}
          </Route>
          <Route path="/preferences">
            {/*<Preferences />*/}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

