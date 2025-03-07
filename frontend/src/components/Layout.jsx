import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useEffect } from "react";
import EndNavbar from "./EndNavbar";


export function Layout() {
  let user = sessionStorage.getItem("User");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <Outlet />
      <EndNavbar />
    </>
  );
}
