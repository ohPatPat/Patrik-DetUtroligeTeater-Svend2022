import { Banner, AllCards } from "../../comp/Banner.jsx";
import { Meta } from "../../comp/Meta.jsx";

export const Forestillinger_Events = (props) => {
  return (
    <Meta title={props.title}>
      <Banner />
      <AllCards />
    </Meta>
  );
};
