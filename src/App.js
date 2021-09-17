/* eslint-disable array-callback-return */
import React, { useState } from "react";
import "./App.css";
let reset = ["Opera", "Chrome", "Safari", "Edge", "Firefox"];

function App() {
  const [selecteddata, setSelecteddata] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [optiondata, setOptiondata] = useState([
    "Opera",
    "Chrome",
    "Safari",
    "Edge",
    "Firefox",
  ]);

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
  };

  const showList = () => {
    setIsVisible(true);
  };

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
        ></input>
        <i className="fas fa-times btn icon" onClick={clearAll}></i>
      </div>
      {isVisible ? (
        <div className="option-list">
          {optiondata
            .filter((val) => {
              if (search === "") {
                return val;
              } else if (
                val.toLocaleLowerCase().includes(search.toLocaleLowerCase())
              ) {
                return val;
              }
            })
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
