import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import "./App.css";

function App() {
  const [selecteddata, setSelecteddata] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [reset, setReset] = useState([]);
  const [optiondata, setOptiondata] = useState([]);
  const [list, setList] = useState(3);

  const { data, isLoading, isError } = useQuery("data", () =>
    axios.get("https://api.instantwebtools.net/v1/passenger?page=0&size=10")
  );
  // console.log(data);

  useEffect(() => {
    if (data) {
      const names = [];
      for (var i = 0; i < 10; i++) {
        // console.log("data loaded : ", data.data.data[i].name);
        // names.push(data.data.data[i].name);
        names.push(data.data.data[i]._id);
        // console.log("names", names);
        setOptiondata(names);
        setReset(names);
      }
    }
  }, [data]);

  const addTag = (event) => {
    // console.log(event.target.innerText);
    setSelecteddata([...selecteddata, event.target.innerText]);
    const addOption = optiondata.filter((e) => e !== event.target.innerText);
    setOptiondata(addOption);
    // console.log(addOption);
    setIsVisible(false);
    setSearch("");
  };

  const deleteTag = (deletedVal) => {
    const newdata = selecteddata.filter((i) => i !== deletedVal);
    setSelecteddata(newdata);
    setOptiondata([...optiondata, deletedVal]);
  };

  const clearAll = () => {
    setSelecteddata([]);
    setOptiondata(reset);
    setIsVisible(false);
    setSearch("");
    setList(3);
  };

  const showList = () => {
    setIsVisible(true);
  };
  const loadMore = () => {
    setList((prevList) => prevList + 3);
  };

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return <h1>Error...</h1>;
  }

  return (
    <div className="App">
      <p>Selector Label *</p>
      <div className="tags-selected">
        <ul className="tags">
          {selecteddata.map((tag, id) => (
            <li key={id} className="tag">
              <span> {tag} </span>
              <button
                className="fas fa-times"
                onClick={() => deleteTag(tag)}
              ></button>
            </li>
          ))}
        </ul>
        <input
          autocomplete="off"
          id="input"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onClick={showList}
        />
        <i className="fas fa-times btn icon" onClick={clearAll}></i>
      </div>

      {isVisible ? (
        <button className="load" onClick={loadMore}>
          Load More
        </button>
      ) : null}

      {isVisible ? (
        <div className="option-list">
          {optiondata
            // eslint-disable-next-line array-callback-return
            .filter((val) => {
              if (search === "") {
                return val;
              } else if (
                val.toLocaleLowerCase().includes(search.toLocaleLowerCase())
              ) {
                return val;
              }
            })
            .splice(0, list)
            .map((option, id) => {
              return (
                <p key={id} className="options" onClick={(e) => addTag(e)}>
                  {option}
                </p>
              );
            })}
        </div>
      ) : null}
    </div>
  );
}

export default App;
