import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import './Products.css'
const Products = (props) => {
    const [ loggedInUser, setLoggedInUser, buyProduct, setBuyProduct] = useContext(UserContext);
    const {name, image, price, _id} = props.product;
    const history = useHistory()


    const handleBuyBtn = () => {
        const url = `https://rugged-olympic-25949.herokuapp.com/product/${_id}`
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setBuyProduct(data);
            history.push('/checkout')
            console.log(data)
        })
        console.log(buyProduct)
    }
    return (
            <div className="col-12 col-sm-4  mt-4">
                <div className="card simple-card p-4">
              
              <img className="card-img-top" src={image} alt="" />
       
                <h5 className="my-4">{name}</h5>
                <div className="d-flex justify-content-between">
                    <h4 className="price">${price}</h4>
                    
                    <button  onClick={handleBuyBtn} className="btn main-btn">Buy Now</button>
                </div> 
                
                </div>
            </div>

    );
};

export default Products;