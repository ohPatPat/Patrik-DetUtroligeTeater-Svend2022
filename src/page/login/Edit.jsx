import { Link, NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "./Auth";
import { Meta } from "../../comp/Meta.jsx";

export const Edit = (props) => {
  const { loginData } = useAuth();
  const { review_id } = useParams();
  console.log(review_id);
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [formStatus, setFormStatus] = useState(false);

  const [Error, setError] = useState("");
  const inputFocus = () => {
    if (Error || errors) {
      setError();
      clearErrors();
    }
  };

  const onSubmit = async (data, e) => {
    const formData = new URLSearchParams();
    formData.append("id", data.review_id);
    formData.append("subject", data.subject);
    formData.append("comment", data.comment);
    console.log(...formData);
    const result = await axios.put(
      `https://api.mediehuset.net/detutroligeteater/reviews`,
      formData,
      { headers: { Authorization: `Bearer ${loginData.access_token}` } }
    );
    if (result) {
      console.log("Din kommentar er opdateret");
    } else {
      console.log(errors);
    }
    setFormStatus(true);
  };
  return (
    <Meta title={props.title}>
      {!formStatus ? (
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" value={review_id} {...register("review_id")} />
          <div
            className={
              Error || errors.password ? "InputWrapperError" : "InputWrapper"
            }
          >
            <input
              placeholder="Emne"
              onFocus={(e) => (e.target.value = "")}
              onClick={inputFocus}
              type="text"
              id="title"
              {...register("subject", { required: true })}
            />
            {errors.title && <span>Du skal indtaste en title</span>}
            {errors.subject?.type === "required" && (
              <span>Du skal udfylde dit adgangskode!</span>
            )}
          </div>

          <div
            className={
              Error || errors.password ? "InputWrapperError" : "InputWrapper"
            }
          >
            <textarea
              placeholder="Kommentar"
              onFocus={(e) => (e.target.value = "")}
              onClick={inputFocus}
              id="content"
              {...register("comment", { required: true })}
            ></textarea>
            {errors.comment?.type === "required" && (
              <span>Du skal udfylde dit adgangskode!</span>
            )}
          </div>
          <div>
            <button onClick={inputFocus} type="submit">
              Send
            </button>
            <button onClick={inputFocus} type="reset">
              Nulstil
            </button>
          </div>
          <NavLink to={"/Login"}>Gå tilbage</NavLink>
        </form>
      ) : (
        <>
          <p>Din kommentar er opdateret!</p>
          <NavLink to={"/Login"}>Gå tilbage</NavLink>
        </>
      )}
    </Meta>
  );
};
