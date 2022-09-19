import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

const Search = (props) => {
  const [keyword, setKeyword] = useState("");
  const { register, handleSubmit } = useForm();

  const getSearchResult = (data) => {
    setKeyword(data.keyword);
  };
  const RemoveSearchResult = () => {
    if (keyword) {
      setKeyword()
    }
  };


  const SearchResult = (props) => {
    const [searchData, setSearchData] = useState([]);
    
    useEffect(() => {
      const getData = async () => {
        const result = await axios.get(
          `https://api.mediehuset.net/homelands/search/${props.keyword}`
        );
        setSearchData(result.data);
      };
      getData();
    }, [props.keyword, setSearchData]);
  
    return (
      <ul id="SearchResult">
        <p>
          Fandt {searchData.num_items} resultater på ordet <i>{props.keyword}</i>
        </p>
        {searchData.items &&
          searchData.items.map((item, i) => {
            return (
              <NavLink key={item.address} to={`/${item.address}`}>
                <li onClick={RemoveSearchResult}>{item.address}</li>
              </NavLink>
            );
          })}
      </ul>
    );
  };
  

  return (
    <>
      <form onSubmit={handleSubmit(getSearchResult)} autoComplete="off" id="Search">
        <div>
          <input
            placeholder="Indtast søgord"
            id="keyword"
            type="text"
            {...register("keyword", { required: true })}
            onFocus={(e) => (e.target.value = "")}
            onClick={RemoveSearchResult}
          />
          <button></button>
        </div>
        {keyword && <SearchResult keyword={keyword} />}
      </form>
    </>
  );

};

export { Search };
