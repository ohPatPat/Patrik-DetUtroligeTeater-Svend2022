import "./App.scss";
import { Footer } from "./comp/Footer.jsx";
import { Header } from "./comp/Header.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { NotFound } from "./page/NotFound.jsx";
import { useAuth } from "./page/login/Auth.js";
import { Home } from "./page/Home.jsx";
import { Login } from "./page/login/Login.jsx";
import { Profile } from "./page/Profile.jsx";
import { Loader, useLoader } from "./comp/PageLoader.jsx";

import { ProductList } from "./page/products/ProductList.jsx";
import { ProductDetails } from "./page/products/ProductDetails.jsx";
import { Forestillinger_Events } from "./page/products/Forestillinger_Events.jsx";

const Redirect = ({ to }) => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
};

function App() {
  const { loginData } = useAuth();

  return (
    <>
      <Loader />
      <Router>
        <Header />
        <Routes>
          {/* Start "route" */}
          <Route index element={<Home title={"Home"} />} />

          {/* Normal "routes" */}
          <Route path="/Login" element={<Login title={"Login"} />} />

          <Route
            path="/Forestillinger_Events"
            element={
              <Forestillinger_Events title={"Forestillinger & events"} />} />

          <Route
            path="/Forestillinger_Events/:product_id"
            element={<ProductDetails title={"ProductDetails"} />} />

          {/* "Route" for when "login-in" */}
          {loginData.access_token && (
            <Route path="/Profile" element={<Profile title={"Profile"} />} />
          )}

          {/* "Route" for not pages that cant be found */}
          <Route path="*" element={<NotFound title={"PageNotFound"} />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
