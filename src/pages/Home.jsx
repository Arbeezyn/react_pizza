import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setPageCount } from "../redux/slices/filterSlice";
import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { searchContext } from "../App";

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.pageCount);
  const dispatch = useDispatch();

  const { searchValue } = useContext(searchContext);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page) => {
    dispatch(setPageCount(page));
  };

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.sort.replace("-", "");
    const order = sortType.direction;
    const search = searchValue ? `&title=${searchValue}` : "";

    // fetch(
    //   `https://64b7eaef21b9aa6eb079475e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setPizzas(data);
    //     setIsLoading(false);
    //   });
    axios
      .get(
        `https://64b7eaef21b9aa6eb079475e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzaArray = pizzas.map((pizza) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} OnClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(8)].map((_, index) => <Skeleton key={index} />)
          : pizzaArray}
      </div>
      <Pagination onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
