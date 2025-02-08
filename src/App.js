// import logo from "./logo.svg";
// import React from "react";
// eslint-disable-next-line no-unused-vars
import { Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/policy"></Route>
        <Route path="/policyholder"></Route>
        <Route path="/claim"></Route>
      </Routes>
    </div>
  );
}

export default App;
