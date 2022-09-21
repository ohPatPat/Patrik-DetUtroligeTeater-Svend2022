import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { CommentsForm, CommentsList } from "../../comp/Comments.jsx";
import { Meta, MetaDetails } from "../../comp/Meta.jsx";

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

export const ProductDetails = (props) => {
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

  const { product_id } = useParams();
  const [productData, setProductData] = useState({});
  useEffect(() => {
    const getProductData = async () => {
      try {
        const result = await axios.get(
          `https://api.mediehuset.net/detutroligeteater/events/${product_id}`
        );
        setProductData(result.data.item);
      } catch (err) {
        console.error(err);
      }
    };
    getProductData();
  }, [product_id]);
  return (
    <MetaDetails title={productData.title}>
      <figure>
        <img src={productData.image_large} alt="" />
        <figcaption>
          <section id="InfoWrapper">
            <div>
              <p className="Scene">{productData.stage_name}</p>
              <p className="Dato">
                {productData.startdate &&
                  FriendlyDate({
                    startdate: productData.startdate,
                    stopdate: productData.stopdate,
                  })}
              </p>
            </div>
            <p className="Pris">BILLETPRIS: {productData.price} DKK</p>
            <hr />
          </section>
          <section id="TitleWrapper">
            <h1>{productData.title}</h1>
            <p>
              <NavLink to={"/"}>Køb billet</NavLink>
            </p>
          </section>
          <section id="DetailsWrapper">
            <h2>{productData.genre}</h2>
            <p>{productData.description}</p>
          </section>

          <section id="Actors" onClick={ShowActors}>
            <h3 id="Oversigt">medvirkende</h3>
            {isShowActors ? (
              <div>
                {productData.actors &&
                  productData.actors.map((apiRoute, i) => {
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
           <CommentsList product_id={product_id} />
     {/* <CommentsForm /> */}
        </figcaption>
      </figure>
    </MetaDetails>
  );
};
