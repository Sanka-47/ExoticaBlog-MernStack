import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { pageData } from "./pageData";


export function Navbar() {


  const navigate = useNavigate()
  function handleLogout(){
    sessionStorage.removeItem("User")
    navigate("/")
  }
  return (
    <div className="navbar">
      {pageData.map((page) => {
        return(<Link to={page.path} className="navItem">
          <button>
            {page.name}
          </button>
        </Link>) 
      })}
      <button onClick={handleLogout} >LogOut</button>
    </div>
  );
}
