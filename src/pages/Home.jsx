import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlog";
import Skeleton from "../components/PizzaBlog/Skeleton";
import Pagination from "../components/Pagination";

const Home = ({ searchValue }) => {
  // STATE
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  // API-DATE
  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://634300d53f83935a784df853.mockapi.io/cards?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setCards(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  // OBJECT-ARRAY
  const pizzas = cards.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  // CARD isLoading method
  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(ind) => setCategoryId(ind)}
        />
        <Sort value={sortType} onChangeSort={(ind) => setSortType(ind)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
