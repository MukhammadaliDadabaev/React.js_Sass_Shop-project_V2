import React, { useContext } from "react";
import { GrSearch, GrFormClose } from "react-icons/gr";
import { SearchContext } from "../../App";

import styles from "./Search.module.scss";

const Search = () => {
  // useContext-Provider
  const { searchValue, setSearchValue } = useContext(SearchContext);

  return (
    <div className={styles.root}>
      <GrSearch className={styles.icon} />
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {searchValue && (
        <GrFormClose
          onClick={() => setSearchValue("")}
          className={styles.clearIcon}
        />
      )}
    </div>
  );
};

export default Search;
