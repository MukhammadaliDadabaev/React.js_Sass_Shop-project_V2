import React from "react";
import { GrSearch, GrFormClose } from "react-icons/gr";

import styles from "./Search.module.scss";

const Search = ({ searchValue, setSearchValue }) => {
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
