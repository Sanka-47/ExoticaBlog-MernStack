import React, { useState } from "react";
import { CreateUser } from "../src/components/CreateUser";
import { Login } from "../src/components/Login";

export function Landing() {
  const [view, setView] = useState(0);

  return (
    <div className="w-screen">
      {!view ? (
        <div>
          <Login setView={setView} />
         
        </div>
      ) : (
        <div className="w-screen  ">
          <CreateUser setView={setView} />
        </div>
      )}
    </div>
  );
}
