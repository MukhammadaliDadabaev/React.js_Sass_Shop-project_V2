import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
//scss styles
import "./scss/app.scss";
//components
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Card from "./pages/Card";

export const SearchContext = React.createContext("");

function App() {
  // SEARCH-INPUT STATE
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/card" element={<Card />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
