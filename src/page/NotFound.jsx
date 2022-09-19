import { Meta } from "../comp/Meta.jsx";
// import { SearchResult } from "../comp/search/Search.jsx";

export const NotFound = (props) => {
  /** window.location.href gets the current url from browser */
  const path = window.location.href;
  /** strips the url fro everything up to the last / */
  const url = path.substring(path.lastIndexOf("/") + 1);

  return (
    <Meta title={props.title}>
{/* <SearchResult keyword={props.keyword} /> */}
      <p>Siden Kan desvære ikke findes</p>
    </Meta>
  );
}
