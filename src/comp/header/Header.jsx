import { NavLink } from "react-router-dom";
import { Login } from "../../page/login/Login.jsx";
import { useAuth } from "../../page/login/Auth.js";
import { Search } from "../search/Search.jsx";
import { Nav, BurgerMenu } from "../Navigation.jsx";


export const Header = () => {
  const { loginData } = useAuth(Login);

  return (
    <header>
      <Search></Search>
      <Nav identify={"HeaderNav"}/>
      <BurgerMenu />
    </header >
  );
};
