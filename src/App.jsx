import "./App.scss";
import { Footer } from "./comp/Footer.jsx";
import { Header } from "./comp/Header.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { NotFound } from "./page/NotFound.jsx";
import { Home } from "./page/Home.jsx";
import { Login } from "./page/login/Login.jsx";
import { Loader } from "./comp/PageLoader.jsx";

import { EventDetails } from "./page/products/EventDetails.jsx";
import { Forestillinger_Events } from "./page/products/Forestillinger_Events.jsx";
import { Bestilling } from "./page/products/Bestilling";
import { Edit } from "./page/login/Edit";


function App() {

  return (
    <>
      <Loader />
      <Router>
        <Header />
        <Routes>
          {/* Start "route" */}
          <Route index element={<Home title={"Home"} />} />


          <Route
            path="/Forestillinger_Events"
            element={
              <Forestillinger_Events title={"Forestillinger & events"} />
            }
          />

          <Route
            path="/Forestillinger_Events/:event_id"
            element={<EventDetails title={"EventDetails"} />}
          />

          <Route
            path="/Forestillinger_Events/:Bestilling/:event_id"
            element={<Bestilling title={"Bestilling"} />}
          />

            <Route path="/Login" element={<Login title={"Min side"} />} />
            <Route path="/Login/:review_id" element={<Edit title={"Edit"} />} />

          {/* "Route" for not pages that cant be found */}
          <Route path="*" element={<NotFound title={"PageNotFound"} />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
