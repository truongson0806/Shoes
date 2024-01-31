import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Category from "./Category";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slide from "./Slide";
import showPrice from "../../utils/showPrice";
import ScrollToTop from "../../utils/ScrollToTop"; 
import Card from '../common/Card/index'

const ShopSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();
  const { item } = useParams();
  const [pr, setPr] = useState([]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(async () => {
    if (item) {
      const res = await axios.get(`/api/products/category/${item}`);
      if (res.status === 200) {
        setPr(res.data);
      }
    } else {
      dispatch(listProduct(keyword, pagenumber));
    }
  }, [dispatch, keyword, pagenumber, item]);



  return (
    <>
      <div className="container">
        <Slide />
        <Category />
        {/* <ScrollToTop/> */}
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : item ? (
                  <>
                    {pr.map((product) =>
                    (product.isShow ? (<Card product={product}/>) : <></>)
                    )}
                  </>
                ) : (
                  <>
                    {products.map((product) => (
                    (product.isShow ? (<Card product={product}/>) : <></>)
                    ))}
                  </>
                )}

                {/* Pagination */}
                <Pagination
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
