import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Banner = () => {
  const [isFetchEvents, setFetchEvents] = useState();

  useEffect(() => {
    const getFetchEvents = async () => {
      try {
        const result = await axios.get(
          `https://api.mediehuset.net/detutroligeteater/events?orderby=rand()`
        );
        setFetchEvents(result.data.items);
      } catch (err) {
        console.error(err);
      }
    };
    getFetchEvents();
  }, []);

  return (
    <section id="Banner">
      {isFetchEvents &&
        isFetchEvents.slice(0, 1).map((apiRoute, i) => {
          return (
            <figure key={i}>
              <figcaption>
                <p className="Scene">{apiRoute.stage_name}</p>
                <p className="Dato">
                  {apiRoute.startdate}-{apiRoute.stopdate}
                </p>
                <hr />
                <h2>{apiRoute.title}</h2>
                <h3>{apiRoute.genre}</h3>
              </figcaption>
              <img src={apiRoute.image} alt={apiRoute.image} />
            </figure>
          );
        })}
    </section>
  );
};
