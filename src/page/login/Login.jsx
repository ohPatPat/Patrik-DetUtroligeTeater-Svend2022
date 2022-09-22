import { useForm } from "react-hook-form";
import { useAuth } from "./Auth.js";
import { Meta } from "../../comp/Meta.jsx";

import axios from "axios";
import { useState } from "react";

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
      console.log(loginData.username);
    } else {
      loginData.username = "Lærer";
      console.log(loginData.username);
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
          <p>
            Du er logget ind som <b>{loginData.username}</b>
          </p>
          <button onClick={logOut}>Log ud</button>
        </div>
      )}
    </Meta>
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
