import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Search = (props) => {
  const [keyword, setKeyword] = useState("");
  const { register, handleSubmit } = useForm();

  const getSearchResult = (data) => {
    setKeyword(data.keyword);
  };
  const RemoveSearchResult = () => {
    if (keyword) {
      setKeyword("");
    }
  };

  const SearchResult = ({ keyword }) => {
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
      const getData = async () => {
        const result = await axios.get(
          `https://api.mediehuset.net/detutroligeteater/events/search/${keyword}`
        );
        setSearchData(result.data);

      };
      getData();
    }, [keyword, setSearchData]);
    return (
      <ul id="SearchResult">
        <p>
          Fandt {searchData.count} resultater på ordet <i>{keyword}</i>
        </p>
        {searchData.items &&
          searchData.items.map((item, i) => {
            return (
              <NavLink
                onClick={RemoveSearchResult}
                key={i}
                to={`/Forestillinger_Events/${item.id}`}
              >
                <li>{item.title}</li>
              </NavLink>
            );
          })}
      </ul>
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(getSearchResult)}
        autoComplete="off"
        id="Search"
      >
        <div>
          <input
            placeholder="Indtast søgord"
            id="keyword"
            type="text"
            {...register("keyword", { required: true })}
            onFocus={(e) => (e.target.value = "")}
            onClick={RemoveSearchResult}
          />
          <button>
            <FaSearch />
          </button>
        </div>
        {keyword && <SearchResult keyword={keyword} />}
      </form>
    </>
  );
};

export { Search };
