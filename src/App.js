import { useState } from "react";
import { Routes, Route } from "react-router-dom";
//scss styles
import "./scss/app.scss";
//components
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Card from "./pages/Card";

// https://634300d53f83935a784df853.mockapi.io/cards
function App() {
  // SEARCH-INPUT STATE
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />} />
          <Route path="/card" element={<Card />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
