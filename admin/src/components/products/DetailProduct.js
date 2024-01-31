import React, { useState, useEffect, useRef } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  detailProduct,
  editProduct,
  updateProduct,
} from "./../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import axios from "axios";
import moment from "moment";
import Rating from "../Rating";


const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const DetailProduct = (props) => {
  const { productId } = props;
  const [disable,setDisable]=useState(false)
  const handleHideReview=async (index)=>{
    await axios.put(`/api/products/review/${productId}`,{index})
    toast.success("Xoá Bình Luận Thành Công");
    setTimeout(()=>{
      location.reload();
    },700)
    
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailProduct(productId));
  }, []);
  const productDetail = useSelector((state) => state.productDetail);
  const { product } = productDetail;

  return (
    <div className="p-5">
      <div className="row">
        <div className="col-md-4">
          <div className="single-image">
            <img src={product.image} alt={product.name} width={400} />
          </div>
        </div>
        <div className="container col-md-6 pr-5 d-flex justify-content-center align-items-center">
          <table class="table table-striped">
            <tr>
              <th scope="row">Tên</th>
              <td>{product.name}</td>
            </tr>
            <tr>
              <th scope="row">Giá</th>
              <td>{product.price}</td>
            </tr>
            <tr>
              <th scope="row">Mô Tả</th>
              <td>{product.description}</td>
            </tr>
            <tr>
              <th scope="row">Số Lượt Review</th>
              <td>{product.numReviews}</td>
            </tr>
            <tr>
              <th scope="row">Rating</th>
              <td>{product.rating}</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <h2>Quản Lý Bình Luận</h2>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="col-md-6">
            <h6 className="mb-3">Đánh giá</h6>
            {product.reviews.length === 0 && (
              <Message variant={"alert-info mt-3"}>
                Chưa có đánh giá nào...
              </Message>
            )}
            {product.reviews.map((review,index) => (
              <div
                key={review._id}
                className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
              >
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <div className="d-flex justify-content-between">
                <span>{moment(review.createdAt).calendar()}</span>
                {review.comment ? (<button className={`btn btn-warning `} title="xoá comment vi phạm tiêu chuẩn cộng đồng , ngôn ngữ không phù hợp"  onClick={()=>{handleHideReview(index)}}>Xoá Comment</button>) : (<></>)}
                
                </div>
                {review.comment ? (<div className="alert alert-info mt-3">{review.comment}</div>) :(<></>)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
