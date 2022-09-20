import { Banner } from "../comp/Banner.jsx";
import { Meta } from "../comp/Meta.jsx";

export const Home = (props) => {
    return (
        <Meta title={props.title}>
          <Banner />
        </Meta>
)
  };
  