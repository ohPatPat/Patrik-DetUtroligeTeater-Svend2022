import { CommentsForm, CommentsResponse } from "../comp/Comments.jsx";
import { Meta } from "../comp/Meta.jsx";

export const Home = (props) => {
    return (
        <Meta title={props.title}>
          <p>hello</p>

          <CommentsForm/>
          <CommentsResponse/>
        </Meta>
)
  };
  