import { Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Header from "../Header/Header";
import DeleteIcon from "@material-ui/icons/Delete";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  useEffect(() => {
    loadOrder()
  }, []);

  const loadOrder = () => {
    fetch("https://rugged-olympic-25949.herokuapp.com/orders?email=" + loggedInUser.email)
    .then((res) => res.json())
    .then((data) => {
    
      setOrders(data)});
  }
  const cancelOrder = (id) => {
      fetch(`https://rugged-olympic-25949.herokuapp.com/delete-order/${id}`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(result => {
      if(result){
        console.log("Delete Successfully")
        loadOrder();
        
      }
    })
   
  };
  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1>Total Order: {orders.length}</h1>
        <div className="card simple-card">
          <div className="table-responsive">
            <table className="table">
              <thead className="text-muted">
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Order Date</th>
                  <th>Cencel Order</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                   <tr>
                    <td>{order.name}</td>
                    <td>${order.price}</td>
                    <td>{new Date(order.date).toDateString("DD-MM-YY")}</td>
                    <td>
                      <Button onClick={() => cancelOrder(order._id)}>
                        <DeleteIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
