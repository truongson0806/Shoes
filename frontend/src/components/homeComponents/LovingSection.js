import React, { useEffect, useState } from "react";
import axios from "axios";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import showPrice from "../../utils/showPrice";

const LovingSection = () => {
  const [listCategory, setListCategory] = useState([]);
  useEffect(() => {
    return new Promise(async () => {
      const res = await axios.get("/api/products/loving");
      if (res.status === 200) {
        setListCategory(res.data);
      }
    });
  }, []);
  return (
    <div className="container">
        <h2>Top các sản phẩm được yêu thích 🏆</h2>
      <div className="section">
        <div className="row">
          <div className="col-lg-12 col-md-12 article">
            <div className="shopcontainer row">
              {listCategory.map((product) => (
                <div
                  className="shop col-lg-3 col-md-6 col-sm-6"
                  key={product._id}
                >
                  <div className="border-product">
                    <Link to={`/products/${product._id}`}>
                      <div className="shopBack">
                        <img src={product.image} alt={product.name} />
                      </div>
                    </Link>

                    <div className="shoptext">
                      <p>
                        <Link to={`/products/${product._id}`}>
                          {product.name}
                        </Link>
                      </p>

                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                      <h3
                        style={{
                          display: "inline-block",
                        }}
                      >
                        {showPrice(product.price)}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LovingSection;
