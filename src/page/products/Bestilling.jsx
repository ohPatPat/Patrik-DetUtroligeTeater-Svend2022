import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BestilingsForm } from "../../comp/Comments.jsx";
import { Meta } from "../../comp/Meta.jsx";
import { useAuth } from "../login/Auth.js";

export const Bestilling = (props) => {
  const { loginData } = useAuth();
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
    <Meta title={props.title}>
      <section id="Wrapper">
        <img src={eventData.image_large} alt="" />
        {loginData ? <BestilingsForm event_id={event_id} /> : <p>Du skal login</p>}
      </section>
    </Meta>
  );
};
