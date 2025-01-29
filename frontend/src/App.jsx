import { HashRouter as Router, Routes, Route } from "react-router-dom";


import { About } from "../pages/About";
import { Home } from "../pages/Home";
import { CreateBlog } from "../pages/CreateBlog";
import { Contact } from "../pages/Contact";
import { Landing } from "../pages/Landing";
import { Profile } from "../pages/Profile";
import { ReadBlog } from "../pages/ReadBlog";

import { Layout } from "./components/Layout";
import { useEffect } from "react";
import axios from "axios";



function App() {

  useEffect(()=>{
    let token = sessionStorage.getItem("User")
    if(token){
       axios.defaults.headers.common["Authorization"]= `Bearer ${token}`
    }

  },[])
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
          
            <Route path="/home" element={<Home />} />
            <Route path="/createblog" element={<CreateBlog />} />
            <Route path="/readblog/:id" element={<ReadBlog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
