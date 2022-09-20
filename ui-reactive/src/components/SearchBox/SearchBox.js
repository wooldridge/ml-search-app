import React, { useState, useContext, useEffect } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
// import { SearchContext } from "../../store/SearchContext";
import { Search } from "react-bootstrap-icons";
import "./SearchBox.scss";
import _ from "lodash";

const SearchBox = (props) => {

  // const searchContext = useContext(SearchContext);

  // const qtextInit: string = searchContext.qtext || "";
  const qtextInit = "";
  let selectedInit = "";

  let items = [];
  if (props.config && props.config.items && props.config.items.length > 0) {
    items = props.config.items;
    let found = items.find(item => item.default === true);
    selectedInit = found ? found.label : items[0].label;
  }

  const [selected, setSelected] = useState(selectedInit);
  const [qtext, setQtext] = useState(qtextInit);
  const searchInputRef = React.createRef();

  // useEffect(() => {
  //   setQtext(searchContext.qtext);
  // }, [searchContext.qtext]);

  // useEffect(() => {
  //   // String menu selections are stored in context as arrays so check both
  //   let found = items.find(item => 
  //     _.isEqual(item.value, searchContext.entityType)  || 
  //     _.isEqual([item.value], searchContext.entityType)
  //   );
  //   if (found && found.label) {
  //     setSelected(found.label);
  //   } else {
  //     setSelected(selectedInit);
  //   }
  // }, [searchContext.entityType]);

  const handleSelect = (e) => {
    setSelected(e);
    searchInputRef.current.focus();
  };

  // Get entity value ("person") for a selected menu label ("Person")
  const getEntityVal = sel => {
    let found = items.find(item => item.label === sel);
    return found ? found.value : "";
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      // searchContext.handleSearch(qtext, getEntityVal(selected));
      props.handleSearch(qtext);
    }
  };

  const handleButton = (e) => {    
    //searchContext.handleSearch(qtext, getEntityVal(selected));
    props.handleSearch(qtext);
  };

  const handleChange = (e) => {
    setQtext(e.target.value);
  };

  const searchBoxStyle = {
    width: props.width ? props.width : "100%"
  };

  let menuItems = items.map((item, i) => {
    return (
      <Dropdown.Item 
        key={"item-" + i} 
        eventKey={item.label}
        active={item.active}
      >{item.label}</Dropdown.Item>
    );
  });

  return (
    <div className="searchBox" style={searchBoxStyle}>
      <InputGroup>
        { items.length > 0 &&
        <DropdownButton
          variant="outline-secondary"
          title={selected}
          data-testid="searchBoxDropdown"
          id="searchBoxDropdown"
          onSelect={handleSelect}
        >
          {menuItems}
        </DropdownButton> }
        <FormControl
          data-testid="searchBox"
          className="shadow-none"
          value={qtext}
          onKeyDown={(e) => handleEnter(e) }
          onChange={handleChange}
          ref={searchInputRef}
        />
        { !props.button && 
          <Search color="#999" size={18} className="searchIcon" data-testid="searchIcon" />
        }
        { props.button && 
          <div className={props.button}>
            <button data-testid="submit" className="submit" onClick={handleButton}>Search</button>
          </div>
        }
      </InputGroup>
    </div>
  );

};

export default SearchBox;
