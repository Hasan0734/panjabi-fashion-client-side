import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../../App";
import Header from "../Header/Header";
import Products from "../Products/Products";
import './Home.css'


const Home = () => {
const [products, setProducts] = useState([]);


useEffect(() => {
  fetch('https://rugged-olympic-25949.herokuapp.com/products')
  .then(res => res.json())
  .then(data => setProducts(data))
}, [])
  return (
    <div className="container">
      <Header />
      <div className="mt-5">
        <div className="input-group search-area mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search Panjabi"
          />
          <button className="btn main-btn">Search</button>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          {
            products.length === 0 && <div className="loader">Loading...</div>
          }
            {
                products.map(pd => <Products  product ={pd} key={pd._id}></Products>)
            }
        </div>
      </div>
    </div>
  );
};

export default Home;
