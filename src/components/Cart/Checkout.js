import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import './Checkout.css';
import CircularProgress from '@material-ui/core/CircularProgress';

const Checkout = () => {
    const [loggedInUser, setLoggedInUser, buyProduct, setBuyProduct] = useContext(UserContext);
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);
    console.log(buyProduct)
    const history = useHistory()
   const handleProductCheckout = () => {
    setCheckoutSuccess(true)
    const {name, price, quantity, image} = buyProduct;
    console.log(name)
       const checkout = {...loggedInUser, name: name, price: price, quantity: quantity, image: image, date: new Date() }
        const url = `https://rugged-olympic-25949.herokuapp.com/checkoutProduct`
       fetch(url, {
           method: 'POST', 
           headers: {'content-type': 'application/json'},
           body: JSON.stringify(checkout)
       })
       .then(res => res.json())
       .then(data => {
           
           console.log(data)
           history.push('/orders')
       })
   }
    return (
        <> 
                <Header />
                <div className="container cart-container">
                 <h1>Checkout</h1>
                 <div className="card simple-card my-4">
                 <div className="table-responsive">
                     <table className="table table-borderless">
                         <thead className="text-muted">
                             <tr>
                                 <th className="description">Description</th>
                                 <th className="text-center">Quantity</th>
                                 <th className="text-center">Price</th>
                             </tr> 
                         </thead>
                         <tbody >
                             {
                                 buyProduct._id && <tr>
                                 <td className="description">{buyProduct.name}</td>
                                 <td className="text-center">{buyProduct.quantity}</td>
                                 <td className="text-center">${buyProduct.price}</td>
                             </tr>
                             }
                         </tbody>
                         <tfoot>
                             <tr>
                                 <td colSpan="2">Total</td>
                                 <td className="text-center">${buyProduct.price || '00'}</td>
                             </tr>
                         </tfoot>
                     </table>
                 </div>
                 </div>
                 { 
                 buyProduct.name && <button onClick={handleProductCheckout} 
                 className="btn main-btn ms-auto">{checkoutSuccess ? <CircularProgress  disableShrink /> : 'Checkout'}</button> 
                 }
                 
                </div>       
        </>
    );
};

export default Checkout;