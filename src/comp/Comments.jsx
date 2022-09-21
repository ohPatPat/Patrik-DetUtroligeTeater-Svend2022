import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../page/login/Auth";



const FriendlyDate = (prop) => {

  const fullString = prop.created
  const dateString = fullString.slice(0, 10)
  const splitDate = dateString.split("-");

  const FriendlyDate = splitDate[2] +"."+ splitDate[1] +"."+ splitDate[0] 


  return FriendlyDate;
};




const CommentsForm = ({ product_id }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginData } = useAuth();

  const submitForm = async (data, e) => {
    const endpoint = "https://api.mediehuset.net/detutroligeteater/reviews";
    const options = {
      headers: {
        Authorization: `Bearer ${loginData.access_token}`,
      },
    };

    const formData = new FormData(e.target);
    console.log(...formData);
    const result = await axios.post(endpoint, formData, options);
    if (result.data.status) {
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <input type="hidden" value={product_id} {...register("event_id")} />
      <div>
        <label htmlFor="subject">Emne</label>
        <input type="text" {...register("subject", { required: true })} />
        {errors.subject && <span>Du skal skrive en titel</span>}
      </div>
      <div>
        <label htmlFor="comment">Kommentar</label>
        <textarea {...register("comment", { required: true })} />
        {errors.comment && <span>Du skal skrive en kommentar</span>}
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

const CommentsList = () => {
  const { product_id } = useParams();
  const [commentData, setCommentData] = useState([]);
  const { loginData } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const endpoint = `https://api.mediehuset.net/detutroligeteater/reviews?event_id=${product_id}`;
      const options = {
        headers: {
          Authorization: `Bearer ${loginData.access_token}`,
        },
      };
      const result = await axios.get(endpoint, options);
      setCommentData(result.data.items);
    };
    getData();
  }, [product_id]);

  return (
    <ul id="Anmeldelser">
      <h3>Anmeldelser</h3>

      {commentData &&
        commentData.map((apiRoute, i) => {
          console.log(apiRoute.user.firstname);
          return (
            <li key={i}>
              <p>{FriendlyDate({created:apiRoute.created})}</p>
              <p>{apiRoute.user.firstname} {apiRoute.user.lastname}</p>
              <p>{apiRoute.comment}</p>
              <hr />
            </li>
          );
        })}
    </ul>
  );
};

const CommentsResponse = () => {
  return (
    <>
      <h1>Tak for din kommentar</h1>
      <CommentsList />
    </>
  );
};

export { CommentsForm, CommentsList, CommentsResponse };
