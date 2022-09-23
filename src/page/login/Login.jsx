import { useForm } from "react-hook-form";
import { useAuth } from "./Auth.js";
import { Meta } from "../../comp/Meta.jsx";

import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { NavLink } from "react-router-dom";

export const Login = (props) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();
  const { loginData, setLoginData } = useAuth();

  const [Error, setError] = useState("");
  const inputFocus = () => {
    if (Error || errors) {
      setError();
      clearErrors();
    }
  };

  const sendLoginRequest = async (data, e) => {
    e.target.reset();
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    try {
      const url = "https://api.mediehuset.net/token";
      const result = await axios.post(url, formData);
      handleSessionData(result);
    } catch (err) {
      setError("Kunne ikke logge ind!");
    }
  };

  const handleSessionData = (res) => {
    if (!res.message) {
      setLoginData(res.data);
      sessionStorage.setItem("token", JSON.stringify(res.data));
    }
  };

  const logOut = () => {
    sessionStorage.removeItem("token");
    setLoginData("");
  };

  if (loginData) {
    if (loginData.username === "pada" || loginData.username === "Patrik") {
      loginData.username = "Patrik";
    } else {
      loginData.username = "Lærer";
    }
  }

  return (
    <Meta title={props.title}>
      {!loginData && !loginData.username ? (
        // Closures funtion here - I end a imported funktion (handleSubmit) via a new funktion (sendLoginRequest)
        <form onSubmit={handleSubmit(sendLoginRequest)}>
          <div
            className={
              Error || errors.username ? "InputWrapperError" : "InputWrapper"
            }
          >
            <input
              onFocus={(e) => (e.target.value = "")}
              onClick={inputFocus}
              type="text"
              id="username"
              autoComplete="username"
              placeholder="Indtast brugernavn"
              {...register("username", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
                min: 4,
              })}
            />
            {errors.username?.type === "required" && (
              <span>Du skal udfylde dit brugernavn!</span>
            )}
            {errors.username?.type === "pattern" && (
              <span>Kun brug bogstaver</span>
            )}
          </div>
          <div
            className={
              Error || errors.password ? "InputWrapperError" : "InputWrapper"
            }
          >
            <input
              onFocus={(e) => (e.target.value = "")}
              onClick={inputFocus}
              type="password"
              id="password"
              autoComplete="password"
              placeholder="Indtast adgangskode"
              {...register("password", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            {errors.password?.type === "required" && (
              <span>Du skal udfylde dit adgangskode!</span>
            )}
            {errors.password?.type === "pattern" && (
              <span>Kun brug bogstaver</span>
            )}
          </div>

          <div>
            <button type="submit" onClick={inputFocus}>
              Login
            </button>
            <button type="reset" onClick={inputFocus}>
              Nulstil
            </button>
          </div>
          {/* Tjekker om besked er true og viser den */}
          {Error && <span>{Error}</span>}
        </form>
      ) : (
        <div>
          <div id="Admin">
            <p>
              Du er logget ind som <b>{loginData.username}</b>
            </p>
            <button onClick={logOut}>Log ud</button>
          </div>
          <AdminBesked />
          <AdminKob />
        </div>
      )}
    </Meta>
  );
};

export const AdminBesked = () => {
  const { loginData } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAdmin = async () => {
      try {
        const result = await axios.get(
          `https://api.mediehuset.net/detutroligeteater/reviews`
        );
        if (result.data) {
          setData(result.data.items);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAdmin();
  }, []);

  //Const til at slette comment via id
  const deleteReviw = async (id) => {
    console.log(id);
    try {
      //Bruger authHeader til at tjekke om sessionStorage eksisterer
      const result = await axios.delete(
        `https://api.mediehuset.net/detutroligeteater/reviews/${id}`,
        { headers: { Authorization: `Bearer ${loginData.access_token}` } }
      );
      if (result) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/*Conditional ternary operator
            bruger kommantar skal kun vises ved login*/}
      {!loginData ? (
        <></>
      ) : (
        <section className="EditWrapper">
          <h3>Mine ANMELDELSER</h3>
          <table>
            <thead>
              <tr>
                <th>FORESTILLING</th>
                <th>EMNE</th>
                <th>Rediger </th>
                <th>Slet</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((user) => user.user_id == loginData.user_id)
                .map((apiRoute, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        {apiRoute.event_title}, {apiRoute.stage_name}
                      </td>
                      <td>{apiRoute.subject}</td>
                      <td>
                        <button>
                          <NavLink to={apiRoute.id}>
                            <AiFillEdit />
                          </NavLink>
                        </button>
                      </td>
                      <td>
                        <button onClick={() => deleteReviw(apiRoute.id)}>
                          <AiFillDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
};
export const AdminKob = (id) => {
  console.log(id);

  const { loginData } = useAuth();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getAdmin = async (id) => {
      try {
        const result = await axios.get(
          `https://api.mediehuset.net/detutroligeteater/reservations`,
          { headers: { Authorization: `Bearer ${loginData.access_token}` } }
        );
        console.log(result);
        if (result.data) {
          setData(result.data.items);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAdmin();
  }, []);

  //Const til at slette comment via id
  const deleteReviw = async (id) => {
    console.log(id);
    try {
      //Bruger authHeader til at tjekke om sessionStorage eksisterer
      const result = await axios.delete(
        `https://api.mediehuset.net/detutroligeteater/reservations/${id}`,
        { headers: { Authorization: `Bearer ${loginData.access_token}` } }
      );
      if (result) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/*Conditional ternary operator
            bruger kommantar skal kun vises ved login*/}
      {!loginData ? (
        <></>
      ) : (
        <section className="EditWrapper">
          <h3>Mine reservationer</h3>

          <table>
            <thead>
              <tr>
                <th>FORESTILLING</th>
                <th>Slet</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((user) => user.user_id == loginData.user_id)
                .map((apiRoute, i) => {
                  console.log(apiRoute);
                  return (
                    <tr key={i}>
                      <td>{apiRoute.event_title}</td>
                      <td>
                        <button onClick={() => deleteReviw(apiRoute.id)}>
                          <AiFillDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
};

export const LoginComp = (props) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();
  const { loginData, setLoginData } = useAuth();

  const [Error, setError] = useState("");
  const inputFocus = () => {
    if (Error || errors) {
      setError();
      clearErrors();
    }
  };

  const sendLoginRequest = async (data, e) => {
    e.target.reset();
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    try {
      const url = "https://api.mediehuset.net/token";
      const result = await axios.post(url, formData);
      handleSessionData(result);
    } catch (err) {
      setError("Kunne ikke logge ind!");
    }
  };

  const handleSessionData = (res) => {
    if (!res.message) {
      setLoginData(res.data);
      sessionStorage.setItem("token", JSON.stringify(res.data));
    }
  };

  const logOut = () => {
    sessionStorage.removeItem("token");
    setLoginData("");
  };

  if (loginData) {
    if (loginData.username === "pada" || loginData.username === "Patrik") {
      loginData.username = "Patrik";
      console.log(loginData.username);
    } else {
      loginData.username = "Lærer";
      console.log(loginData.username);
    }
  }

  return (
    <>
      {!loginData && !loginData.username ? (
        // Closures funtion here - I end a imported funktion (handleSubmit) via a new funktion (sendLoginRequest)
        <form onSubmit={handleSubmit(sendLoginRequest)}>
          <div
            className={
              Error || errors.username ? "InputWrapperError" : "InputWrapper"
            }
          >
            <input
              onFocus={(e) => (e.target.value = "")}
              onClick={inputFocus}
              type="text"
              id="username"
              autoComplete="username"
              placeholder="Indtast brugernavn"
              {...register("username", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
                min: 4,
              })}
            />
            {errors.username?.type === "required" && (
              <span>Du skal udfylde dit brugernavn!</span>
            )}
            {errors.username?.type === "pattern" && (
              <span>Kun brug bogstaver</span>
            )}
          </div>
          <div
            className={
              Error || errors.password ? "InputWrapperError" : "InputWrapper"
            }
          >
            <input
              onFocus={(e) => (e.target.value = "")}
              onClick={inputFocus}
              type="password"
              id="password"
              autoComplete="password"
              placeholder="Indtast adgangskode"
              {...register("password", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            {errors.password?.type === "required" && (
              <span>Du skal udfylde dit adgangskode!</span>
            )}
            {errors.password?.type === "pattern" && (
              <span>Kun brug bogstaver</span>
            )}
          </div>

          <div>
            <button type="submit" onClick={inputFocus}>
              Login
            </button>
            <button type="reset" onClick={inputFocus}>
              Nulstil
            </button>
          </div>
          {/* Tjekker om besked er true og viser den */}
          {Error && <span>{Error}</span>}
        </form>
      ) : (
        <div>
          <p>
            Du er logget ind som <b>{loginData.username}</b>
          </p>
          <button onClick={logOut}>Log ud</button>
        </div>
      )}
    </>
  );
};
