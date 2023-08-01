import "./App.css";
import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";

import Header from "./components/Header";

import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export const searchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <searchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </searchContext.Provider>
    </div>
  );
}

export default App;
