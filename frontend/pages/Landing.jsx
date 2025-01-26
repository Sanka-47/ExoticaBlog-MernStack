import React, { useState } from 'react'
import { CreateUser } from '../src/components/CreateUser'
import { Login } from '../src/components/Login'




export function Landing() {
  // view == 0 --> Login
  // view == 1 --> Create
  const [view, setView] = useState(0);
  
  return (
    <>
      {!view ? 
        <>
          <Login />
          <button onClick={() => setView(!view)}>Create new Account</button>
        </> :
        <>
          <CreateUser />
          <button onClick={() => setView(!view)}>Login to existing account</button>
        </>
      }
    </>
  );
}
