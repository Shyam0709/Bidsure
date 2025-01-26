import React from "react";
import Navbar from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Contact } from "./components/Contact";
import Cards from "./components/Cards";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import Verify from "./components/Verify";
import Tendercard from "./components/Tendercard";
import Bid from "./components/Bid";
import Filter from "./components/Filter";
import Quote from "./components/Quote";
import Final from "./components/Final";
import Map from "./components/Map";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}></Route>
        <Route path="/Home" element={<Home/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Signup" element={<Signup/>}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/verify" element={<Verify />}></Route>
        <Route path="/Tendercard" element={<Tendercard/>}></Route>
        <Route path="/bid" element={<Bid />}></Route>
        <Route path="/filter" element={<Filter />}></Route>
        <Route path="/vendortools" element={<Quote />}></Route>
        <Route path="/final" element={<Final/>}></Route>
        <Route path="/map" element={<Map />}></Route>
      </Routes>
    </div>
  );
}

export default App;
