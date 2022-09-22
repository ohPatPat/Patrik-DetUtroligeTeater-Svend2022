import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../page/login/Auth";

const FriendlyDate = (prop) => {
  const fullString = prop.created;
  const dateString = fullString.slice(0, 10);
  const splitDate = dateString.split("-");

  const FriendlyDate = splitDate[2] + "." + splitDate[1] + "." + splitDate[0];

  return FriendlyDate;
};
export const CommentsForm = ({ event_id }) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();
  const { loginData } = useAuth();

  const [Error, setError] = useState("");
  const inputFocus = () => {
    if (Error || errors) {
      setError();
      clearErrors();
    }
  };

  const submitForm = async (data, e) => {
    e.target.reset();
    const endpoint = "https://api.mediehuset.net/detutroligeteater/reviews";
    const options = {
      headers: {
        Authorization: `Bearer ${loginData.access_token}`,
      },
    };

    const formData = new FormData(e.target);
    formData.append("subject", data.subject);
    formData.append("comment", data.comment);
    console.log(...formData);
    const result = await axios.post(endpoint, formData, options);
  };
  return (
    <form autoComplete="off" onSubmit={handleSubmit(submitForm)}>
      <input type="hidden" value={event_id} {...register("event_id")} />
      <div
        className={
          Error || errors.subject ? "InputWrapperError" : "InputWrapper"
        }
      >
        <input
          placeholder="Emne"
          onFocus={(e) => (e.target.value = "")}
          onClick={inputFocus}
          type="text"
          {...register("subject", {
            required: true,
            min: 4,
          })}
        />
        {errors.subject?.type === "required" && (
          <span>Du skal udfylde Emne</span>
        )}
        {errors.subject?.type === "min" && (
          <span>Du skal minimum brug 4 bogstaver</span>
        )}
      </div>
      <div
        className={
          Error || errors.comment ? "InputWrapperError" : "InputWrapper"
        }
      >
        <textarea
          placeholder="Kommentar"
          onFocus={(e) => (e.target.value = "")}
          onClick={inputFocus}
          {...register("comment", {
            required: true,
            min: 4,
          })}
        />
        {errors.comment?.type === "required" && (
          <span>Du skal udfylde commenter</span>
        )}
        {errors.comment?.type === "min" && (
          <span>Du skal minimum brug 4 bogstaver</span>
        )}
      </div>
      <div>
        <button onClick={inputFocus}>Send</button>
        <button type="reset" onClick={inputFocus}>
          Nulstil
        </button>
      </div>
      {/* Tjekker om besked er true og viser den */}
      {Error && <span>{Error}</span>}
    </form>
  );
};

export const CommentsList = () => {
  const { event_id } = useParams();
  const [commentData, setCommentData] = useState([]);
  const { loginData } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const endpoint = `https://api.mediehuset.net/detutroligeteater/reviews?event_id=${event_id}`;
      const options = {
        headers: {
          Authorization: `Bearer ${loginData.access_token}`,
        },
      };
      const result = await axios.get(endpoint, options);
      setCommentData(result.data.items);
    };
    getData();
  }, [loginData]);

  return (
    <ul id="Anmeldelser">
      <h3>Anmeldelser</h3>

      {commentData &&
        commentData.map((apiRoute, i) => {
          return (
            <li key={i}>
              <hr />
              <p>{FriendlyDate({ created: apiRoute.created })}</p>
              <p>
                {apiRoute.user.firstname} {apiRoute.user.lastname}
              </p>
              <p>{apiRoute.comment}</p>
            </li>
          );
        })}
    </ul>
  );
};
