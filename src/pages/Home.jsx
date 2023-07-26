import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";

const Home = ({ searchValue }) => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sort: "rating",
    direction: "asc",
  });

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.sort.replace("-", "");
    const order = sortType.direction;
    const search = searchValue ? `&title=${searchValue}` : "";

    fetch(
      `https://64b7eaef21b9aa6eb079475e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPizzas(data);
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
        <Categories
          value={categoryId}
          OnClickCategory={(id) => setCategoryId(id)}
        />
        <Sort value={sortType} OnClickSort={(type) => setSortType(type)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(8)].map((_, index) => <Skeleton key={index} />)
          : pizzaArray}
      </div>
      <Pagination onChangePage={(page) => setCurrentPage(page)} />
    </div>
  );
};

export default Home;
