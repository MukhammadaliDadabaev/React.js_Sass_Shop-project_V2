import React, { useEffect, useState, useContext } from "react";
// React-Redux-state
import { useDispatch, useSelector } from "react-redux";
// Redux-toolkit
import { setCategoryId } from "../redux/slices/filterSlice";

import { SearchContext } from "../App";
// components
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlog";
import Skeleton from "../components/PizzaBlog/Skeleton";
import Pagination from "../components/Pagination";

const Home = () => {
  // REDUX-STATE
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);

  // Redux-func
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  // useContext-Provider
  const { searchValue } = useContext(SearchContext);
  // STATE
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // API-DATE
  useEffect(() => {
    setIsLoading(true);
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
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
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // OBJECT-ARRAY
  const pizzas = cards.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  // CARD isLoading method
  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
