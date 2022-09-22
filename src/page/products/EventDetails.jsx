import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { CommentsForm, CommentsList } from "../../comp/Comments.jsx";
import { Meta, MetaDetails } from "../../comp/Meta.jsx";
import { useAuth } from "../login/Auth.js";
import { LoginComp } from "../login/Login.jsx";


const FriendlyDate = (props) => {
  const startarray = props.startdate.split("-");
  const stoparray = props.stopdate.split("-");

  const month = [
    "Januar",
    "Februar",
    "Marts",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const startDate = startarray[2] + ". " + month[startarray[1] - 1];
  const stopDate =
    stoparray[2] + ". " + month[stoparray[1] - 1] + " " + stoparray[0];

  return startDate + " - " + stopDate;
};

export const EventDetails = (props) => {
	const { loginData } = useAuth();

  const [isShowActors, setShowActors] = useState(false);

  const ShowActors = () => {
    if (!isShowActors) {
      setShowActors(true);
      console.log(isShowActors);
    } else {
      setShowActors(false);
      console.log(isShowActors);
    }
  };

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
    <MetaDetails title={eventData.title}>
      <figure>
        <img src={eventData.image_large} alt={eventData.image_large} />
        <figcaption>
          <section id="InfoWrapper">
            <div>
              <p className="Scene">{eventData.stage_name}</p>
              <p className="Dato">
                {eventData.startdate &&
                  FriendlyDate({
                    startdate: eventData.startdate,
                    stopdate: eventData.stopdate,
                  })}
              </p>
            </div>
            <p className="Pris">BILLETPRIS: {eventData.price} DKK</p>
            <hr />
          </section>
          <section id="TitleWrapper">
            <h1>{eventData.title}</h1>
            <p>
              <NavLink to={`/Forestillinger_Events/Bestilling/${eventData.id}`}>Køb billet</NavLink>
            </p>
          </section>
          <section id="DetailsWrapper">
            <h2>{eventData.genre}</h2>
            <p>{eventData.description}</p>
          </section>

          <section id="Actors" onClick={ShowActors}>
            <h3 id="Oversigt">medvirkende</h3>
            {isShowActors ? (
              <div>
                {eventData.actors &&
                  eventData.actors.map((apiRoute, i) => {
                    return (
                      <figure key={i}>
                        <img src={apiRoute.image} alt={apiRoute.image} />
                        <figcaption className="figcaption">
                          <h3>{apiRoute.name}</h3>
                        </figcaption>
                      </figure>
                    );
                  })}
              </div>
            ) : (
              <p>læs mere</p>
            )}
            <hr />
          </section>
          <CommentsList event_id={event_id} />
        </figcaption>
        <footer>
			{loginData.access_token ? (
				<>
			<h3>Skriv en anmeldelse</h3>
          <CommentsForm event_id={event_id} />
		  </>
		  ) : (<>
		  <h3>Du skal være logget ind for at skrive en anmeldelse</h3>
		  <LoginComp/>
		  </> )}
        </footer>
      </figure>
    </MetaDetails>
  );
};
