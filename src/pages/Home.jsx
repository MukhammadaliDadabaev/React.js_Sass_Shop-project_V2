import React, { useEffect, useState, useContext, useRef } from "react";
// qs link
import qs from "qs";
// react-router
import { useNavigate } from "react-router-dom";
// AXIOS-API
import axios from "axios";
// React-Redux-state
import { useDispatch, useSelector } from "react-redux";
// Redux-toolkit
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import { SearchContext } from "../App";
// components
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlog";
import Skeleton from "../components/PizzaBlog/Skeleton";
import Pagination from "../components/Pagination";

const Home = () => {
  // ROUTER
  const navigate = useNavigate();

  // REDUX-STATE
  const dispatch = useDispatch();

  // Filter-ROUTER-Render
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  // useContext-Provider
  const { searchValue } = useContext(SearchContext);
  // STATE
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  // REACT-REDUX
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  // Fetch-API
  const fetchPizzas = () => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://634300d53f83935a784df853.mockapi.io/cards?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setCards(res.data);
        setIsLoading(false);
      });
  };

  // QUERY-qs ---> 2-render
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    // Bu saqlaydi
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // ROUTER-LINK---> 1-render
  // Bu agar birinchi render bo'lsa, parametrlarni tekshiring va uni reduxda saqlang
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // API-DATE
  // Bu 1-chi render-dan keyin card-to'ladi
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
