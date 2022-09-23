import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const FriendlyDate = (prop) => {
  const startarray = prop.startdate.split("-");
  const stoparray = prop.stopdate.split("-");

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
                  {FriendlyDate({
                    startdate: apiRoute.startdate,
                    stopdate: apiRoute.stopdate,
                  })}
                </p>
                <hr />
                <h2>{apiRoute.title}</h2>
                <h3>{apiRoute.genre}</h3>
              </figcaption>
              <img src={apiRoute.image_small} alt={apiRoute.image_small} />
            </figure>
          );
        })}
    </section>
  );
};

export const ThreeCards = () => {
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
    <section id="ThreeCards">
      {isFetchEvents &&
        isFetchEvents.slice(0, 3).map((apiRoute, i) => {
          return (
            <figure key={i}>
              <img src={apiRoute.image_small} alt={apiRoute.image_small} />
              <figcaption>
                <p className="Scene">{apiRoute.stage_name}</p>
                <p className="Dato">
                  {FriendlyDate({
                    startdate: apiRoute.startdate,
                    stopdate: apiRoute.stopdate,
                  })}
                </p>
                <hr />
                <h2>{apiRoute.title}</h2>
                <h3>{apiRoute.genre}</h3>
                <ul>
                  <li>
                    <NavLink to={`/Forestillinger_Events/${apiRoute.id}`}>læs mere</NavLink>
                  </li>
                  <li>
                    <NavLink to={`/Forestillinger_Events/Bestilling/${apiRoute.id}`}>køb billet</NavLink>
                  </li>
                </ul>
              </figcaption>
            </figure>
          );
        })}
    </section>
  );
};

export const AllCards = () => {
  const [isFetchEvents, setFetchEvents] = useState();

  useEffect(() => {
    const getFetchEvents = async () => {
      try {
        const result = await axios.get(
          `https://api.mediehuset.net/detutroligeteater/events`
        );
        setFetchEvents(result.data.items);
      } catch (err) {
        console.error(err);
      }
    };
    getFetchEvents();
  }, []);

  return (
    <section id="AllCards">
      <h3 id="Oversigt">oversigt</h3>
      {isFetchEvents &&
        isFetchEvents.map((apiRoute, i) => {
          return (
            <figure key={i}>
              <img src={apiRoute.image_small} alt={apiRoute.image_small} />
              <figcaption className="figcaption">
                <div>
                  <h2>{apiRoute.title}</h2>
                  <hr />
                </div>
                <div>
                  <p className="Scene">{apiRoute.stage_name}</p>
                  <p className="Dato">
                    {FriendlyDate({
                      startdate: apiRoute.startdate,
                      stopdate: apiRoute.stopdate,
                    })}
                  </p>
                </div>
                <ul>
                  <li>
                    <NavLink to={`${apiRoute.id}`}>læs mere</NavLink>
                  </li>
                  <li>
                    <NavLink to={`/Forestillinger_Events/Bestilling/${apiRoute.id}`}>køb billet</NavLink>
                  </li>
                </ul>
              </figcaption>
            </figure>
          );
        })}
    </section>
  );
};
