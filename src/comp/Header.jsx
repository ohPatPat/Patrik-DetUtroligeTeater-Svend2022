import { NavLink } from "react-router-dom";
import { Login } from "../page/login/Login.jsx";
import { useAuth } from "../page/login/Auth.js";
import { Search } from "./Search.jsx";
import { Nav, BurgerMenu } from "./Navigation.jsx";
import  Icon_Logo  from "../assets/icons/Icon_Logo.svg";


export const Header = () => {
  const { loginData } = useAuth(Login);

  return (
    <header>
      <img src={Icon_Logo} alt="Det Utrolige Teater logo" loading="lazy"/>
      <Search></Search>
      <Nav identify={"HeaderNav"}/>
      <BurgerMenu />
    </header >
  );
};
