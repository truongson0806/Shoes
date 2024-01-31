import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Rating from "../../homeComponents/Rating";
import Pagination from "../../homeComponents/pagination";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../LoadingError/Loading";
import Message from "../../LoadingError/Error";
import { useParams } from "react-router-dom";
import axios from "axios";
import showPrice from "../../../utils/showPrice";

const index = ({ product }) => {
  return (
    <div className="shop col-lg-4 col-md-6 col-sm-6" key={product._id}>
      <div className="border-product">
        <Link to={`/products/${product._id}`}>
          <div className="shopBack">
            <img src={product.image} alt={product.name} />
          </div>
        </Link>

        <div className="shoptext">
          <p
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <Link to={`/products/${product._id}`}>{product.name}</Link>
          </p>

          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          <h3
            style={{
              display: "inline-block",
              color: "tomato",
            }}
          >
            {showPrice(product.price)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default index;
