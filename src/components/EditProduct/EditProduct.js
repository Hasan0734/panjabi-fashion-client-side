import React from "react";
import { useForm } from "react-hook-form";

const EditProduct = ({editProduct}) => {
    console.log(editProduct)
    const {
      register,
      handleSubmit,
    
      formState: { errors },
    } = useForm();
    const onSubmit = (data, id) => {
          const product = {
            name: data.name,
            price: data.price,
            quantity: data.quantity,
        };
        alert("Are You sure Product Add?")
        const url = `https://rugged-olympic-25949.herokuapp.com/updateProduct/${editProduct.id}`
        fetch(url, {
            method: 'PATCH', 
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(product)
        })
        .then(res => {
            console.log('server side responce', res);
          
        })
        
    };
  
    return (
        <div className="card simple-card addProduct">
        <form onSubmit={handleSubmit(onSubmit)}>
            <h6>Update Product Name</h6>
          <input defaultValue={editProduct.name} className="form-control" {...register("name",  {required: true })} placeholder="Enter Name"/>
          {errors.name && <span className="text-danger mb-2">Product name is required</span>}
            <br />
            <h6>Upadate Price</h6>
          <input defaultValue={editProduct.price} className="form-control" {...register("price", { required: true, pattern: /^[1-9]\d*$/ })} placeholder="Product Price" />
          {errors.price && <span className="text-danger mb-2">Price is required digit</span>}
          <h6>Update Quantity</h6>
          <input defaultValue={editProduct.quantity} className="form-control" {...register("quantity", { required: true, pattern: /^[1-9]\d*$/ })} placeholder="Product Price" />
          {errors.quantity && <span className="text-danger mb-2">Product Quantity is required digit</span>}
          <input className="btn main-btn" type="submit" value="Update"/>
        </form>
      </div>
    );
};

export default EditProduct;