import { Meta } from "../comp/Meta.jsx";
import { useAuth } from "./login/Auth.js";
import { Login } from "./login/Login.jsx";


export const Profile = (props) => {
  const { loginData } = useAuth(Login);

    return (
        <Meta title={props.title}>
          <p>Hej <i>{loginData.username}</i></p>

        </Meta>
)
  };
  