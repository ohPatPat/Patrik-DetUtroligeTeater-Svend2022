import React, { useState, useEffect  } from "react";
import { Squash as Hamburger, Squash } from "hamburger-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../page/login/Auth.js";
import { Login } from "../page/login/Login.jsx";


export const Nav = (props) => {
  const { loginData } = useAuth(Login);

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
            {loginData.access_token ? "Log ud" : "Login"}
          </NavLink>
        </li>
      </ul>
    </nav>

  );
};


export const BurgerMenu = () => {
  const [isOpen, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!isOpen);
  };


  return (
    <>
      <Squash toggled={isOpen} toggle={setOpen} />
      <Nav name={isOpen ? "Active" : "notActive"} click={handleToggle} />
    </>
  );
};


