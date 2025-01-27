 import React from 'react'
 import {createUser} from "../api"
 import {useState} from "react"
 import { useNavigate } from "react-router-dom";



 export function CreateUser() {

const [user,setUser] = useState({
    name:"",
    email:"",
    password:""
})
const navigate = useNavigate();

function handleChange(e){
setUser({...user, [e.target.name]: e.target.value})
}

async function handleSubmit(e){
   e.preventDefault()
let response = await createUser(user)
if(response.status !==200){
    alert("User Account Could Not Be Created :(")
}else{
    
    navigate("/login")

  alet("Account Created Successfully!")

}
}

  return (
  <form onSubmit ={handleSubmit}>
    <input placeholder={"Name"} onChange={handleChange} name="name"  required maxLength={20}/>
    <input placeholder={"Email"} onChange={handleChange} name="email" required maxLength={40}/>
    <input placeholder={"Password"} onChange={handleChange} name="password" required maxLength={20} type='password'/>                        
    <button type='submit'>Create Account</button>
  </form>
  )
}

