import React, { useCallback, useContext, useRef, useState } from "react";
// LODASH.DBOUNCE
import debounce from "lodash.debounce";
// react-icons
import { GrSearch, GrFormClose } from "react-icons/gr";
import { SearchContext } from "../../App";

import styles from "./Search.module.scss";

const Search = () => {
  //-------> STATE
  const [value, setValue] = useState();
  //-------> useContext-Provider, useRef
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  //------> Hendler func
  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };
  //------> Lodash-input useCallback
  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 350),
    []
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <GrSearch className={styles.icon} />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <GrFormClose onClick={onClickClear} className={styles.clearIcon} />
      )}
    </div>
  );
};

export default Search;
