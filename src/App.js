import React, { useEffect, useState } from "react";
//scss styles
import "./scss/app.scss";
//components
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

// https://634300d53f83935a784df853.mockapi.io/cards
function App() {
  // STATE
  const [cards, setCards] = useState([]);

  // API-DATE
  useEffect(() => {
    fetch("https://634300d53f83935a784df853.mockapi.io/cards")
      .then((res) => res.json())
      .then((arr) => {
        setCards(arr);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {cards.map((obj) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
