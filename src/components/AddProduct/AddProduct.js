import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./AddProduct.css";

const AddProduct = () => {
  const [imageURL, setImageURL] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (imageURL) {
      const product = {
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        image: imageURL,
      };
      alert("Are You sure Product Add?");
      const url = `https://rugged-olympic-25949.herokuapp.com/addProduct`;
      fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product),
      }).then((res) => {
        console.log("server side responce", res);
        reset();
      });
    }
  };

  const handleUploadImage = (event) => {
    console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "7a45ba192120853967163568ed66cdd4");
    imageData.append("image", event.target.files[0]);
    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then((response) => {
        setImageURL(response.data.data.display_url);
        console.log(response.data.data.display_url);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="card simple-card addProduct">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h6>Product Name</h6>
          <input
            className="form-control"
            {...register("name", { required: true })}
            placeholder="Enter Name"
          />
          {errors.name && (
            <span className="text-danger mb-2">Product name is required</span>
          )}
          <br />
          <h6>Add Price</h6>
          <input
            className="form-control"
            {...register("price", { required: true, pattern: /^[1-9]\d*$/ })}
            placeholder="Product Price"
          />
          {errors.price && (
            <span className="text-danger mb-2">Price is required digit</span>
          )}
          <h6>Add Quantity</h6>
          <input
            className="form-control"
            {...register("quantity", { required: true, pattern: /^[1-9]\d*$/ })}
            placeholder="Product Price"
          />
          {errors.quantity && (
            <span className="text-danger mb-2">
              Product Quantity is required digit
            </span>
          )}
          <br />
          <input
            onChange={handleUploadImage}
            className="form-control"
            type="file"
            required
          />

          <br />
          <input className="btn main-btn" type="submit" />
        </form>
      </div>
    </>
  );
};

export default AddProduct;
