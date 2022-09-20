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
import { Loader } from "./comp/PageLoader.jsx";

import { ProductList } from "./page/products/ProductList.jsx";
import { ProductDetails } from "./page/products/ProductDetails.jsx";
import { Products } from "./page/products/Products.jsx";

const Redirect = ({ to }) => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
};

// cake
function App() {
  const { loginData } = useAuth(Login);

  return (
    <>
      <Loader />
      <Router>
        <Header></Header>
        <Routes>
          {/* Start "route" */}
          <Route index element={<Home title={"Home"} />} />

          {/* Normal "routes" */}
          <Route path="/Login" element={<Login title={"Login"} />} />

          <Route path="/products">
            <Route index element={<Products title={"Products"} />}></Route>
            <Route path=":group_id">
              <Route
                index
                element={<ProductList title={"ProductList"} />}
              ></Route>
              <Route
                path=":product_id"
                element={<ProductDetails title={"ProductDetails"} />}
              ></Route>
            </Route>
          </Route>

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
