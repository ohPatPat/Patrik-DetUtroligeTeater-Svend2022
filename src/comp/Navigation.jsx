import React, { useState, useEffect, createContext } from "react";
import { Squash as Hamburger, Squash } from "hamburger-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../page/login/Auth.js";
import { Login } from "../page/login/Login.jsx";

const BurgerContext = createContext();

export const Nav = (props) => {
  const { loginData } = useAuth();

  return (
    <nav className={props.name} id={props.identify}>
      <ul onClick={props.click}>
        <li>
          <NavLink to="/" onClick={props.click}>
            Forside
          </NavLink>
        </li>
        <li>
          <NavLink to="/Forestillinger_Events" onClick={props.click}>
            forestillinger &amp; events
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" onClick={props.click}>
            SKUESPILLERE
          </NavLink>
        </li>

        <li>
          <NavLink to="/Login" onClick={props.click}>
            {loginData.access_token ? "min side" : "Login"}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export const BurgerMenu = () => {
  const [isOpen, setOpen] = useState(false);

    if (isOpen) {
      document.body.style.height = "100%";
      document.body.style.overflow = "hidden";
    } 

    useEffect(() => {
      if(!isOpen) {
        document.body.style.height = "auto";
        document.body.style.overflow = "auto";
          }
    }, [isOpen]);
  


  const handleToggle = () => {
    setOpen(!isOpen);
  };
  return (
    <>
      <Squash toggled={isOpen} toggle={setOpen}  />
      <Nav name={isOpen ? "Active" : "notActive"} click={handleToggle} />
    </>
  );
};
