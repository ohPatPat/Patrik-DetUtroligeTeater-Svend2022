import React, { useState, useEffect  } from "react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../page/login/Auth.js";
import { Search } from "./Search.jsx";
import { Nav, BurgerMenu } from "./Navigation.jsx";
import  Icon_Logo  from "../assets/icons/Icon_Logo.svg";

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    }
  }, [scrollDirection]);

  return scrollDirection;
};


export const Header = () => {
  const { loginData } = useAuth();
  const scrollDirection = useScrollDirection();
  return (
    <header id={ scrollDirection === "down" ? "Hide" : "Show"}>
      <NavLink to="/">
      <img src={Icon_Logo} alt="Det Utrolige Teater logo" loading="lazy"/>
      </NavLink>
      <div id="HeaderWrapper">
      <Search></Search>
      <Nav identify={"HeaderNav"}/>
      <BurgerMenu />
      </div>
    </header >
  );
};
