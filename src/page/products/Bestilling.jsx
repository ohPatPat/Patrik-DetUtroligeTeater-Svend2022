import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { BestilingsForm, CommentsForm, CommentsList } from "../../comp/Comments.jsx";
import { Meta, MetaDetails } from "../../comp/Meta.jsx";
import { useAuth } from "../login/Auth.js";
import { LoginComp } from "../login/Login.jsx";



export const Bestilling = (props) => {


  const { event_id } = useParams();
  const [eventData, setEventData] = useState({});
  useEffect(() => {
    const getEventData = async () => {
      try {
        const result = await axios.get(
          `https://api.mediehuset.net/detutroligeteater/events/${event_id}`
        );
        setEventData(result.data.item);
      } catch (err) {
        console.error(err);
      }
    };
    getEventData();
  }, [event_id]);
  return (
    <MetaDetails title={"cake"}>
        <img src={eventData.image_large} alt="" />
        <BestilingsForm event_id={event_id}/>
    </MetaDetails>
  );
};
