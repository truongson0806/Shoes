import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  listProductDetails,
} from "../Redux/Actions/ProductActions";
import { addToCart, removefromcart } from "./../Redux/Actions/cartActions";
import Loading from "../components/LoadingError/Loading";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";
import moment from "moment";
import { toast } from "react-toastify";
import showPrice from "../utils/showPrice";
import { AlertError, AlertSuccess } from "../utils/alertBox";
import Footer from "../components/Footer";

const SingleProduct = ({ history, match }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [qty, setQty] = useState(1);
  const handleIncrease = () => {
    if (qty <= 1) return;
    setQty((pre) => pre - 1);
  };
  const handleDecrease = () => {
    setQty((pre) => pre + 1);
  };
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [listStore, setListStore] = useState(
    JSON.parse(localStorage.getItem("favorite")) || []
  );
  const productId = match.params.id;
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { products } = useSelector((state) => state.productList);
  const productRecommend = products.filter((i) => {
    i.category == productDetails.product.category;
  });
  console.log(productRecommend);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successCreateReview) {
      AlertSuccess("Bạn đã đánh giá thành công");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(productId));
  }, [dispatch, productId, successCreateReview]);

  const AddToCartHandle = (e) => {
    e.preventDefault();
    console.log(qty);
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  const AddToFavoriteHandle = () => {
    const store = JSON.parse(localStorage.getItem("favorite"));
    let obj = {
      id: product._id,
      name: product.name,
      img: product.image,
      price: product.price,
    };

    if (store) {
      const listStore = JSON.parse(localStorage.getItem("favorite"));
      const a = [...listStore];
      const exits = a.find((item) => item.id == product._id);
      if (exits) {
        AlertError("Danh sách yêu thích đã tồn tại");
      } else {
        a.push(obj);
        localStorage.setItem("favorite", JSON.stringify(a));
      }
    } else {
      const a = [];
      a.push(obj);
      localStorage.setItem("favorite", JSON.stringify(a));
    }
    history.push(`/favorite`);
    // AlertSuccess("Thêm vào danh sách yêu thích thành công")
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Header />
      <div className="container single-product">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="single-image">
                  <img src={product.image} alt={product.name} />
                  <i
                    className={`fas fa-heart heart ${
                      listStore.find((item) => item.id == product._id)
                        ? "bg-red"
                        : ""
                    }`}
                    onClick={AddToFavoriteHandle}
                  ></i>
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                  </div>
                  <p>{product.description}</p>

                  <div className="product-count col-lg-7 ">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Giá Mua </h6>
                      <span>{product.price && showPrice(product.price)}</span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Đánh giá</h6>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </div>
                    <>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Số lượng</h6>
                        <div className="ProductInfor__amount-input">
                          <button onClick={handleIncrease}>-</button>
                          <input type="text" value={qty} />
                          <button onClick={handleDecrease}>+</button>
                        </div>
                      </div>
                      <button
                        onClick={AddToCartHandle}
                        className="round-black-btn"
                      >
                        Mua Ngay 👉🏻
                      </button>
                    </>
                  </div>
                </div>
              </div>
            </div>

            {/* RATING */}
            <div className="row my-5">
              <div className="col-md-6">
                <h6 className="mb-3">Đánh giá</h6>
                {product.reviews.length === 0 && (
                  <Message variant={"alert-info mt-3"}>
                    Chưa có đánh giá nào...
                  </Message>
                )}
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                  >
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <span>{moment(review.createdAt).calendar()}</span>
                    {(review.comment =='' || review.comment==null) ? (<></>):(<div className="alert alert-info mt-3">
                      {review.comment}
                    </div>)}
                  </div>
                ))}
              </div>
              <div className="col-md-6">
                <h6>Viết đánh giá của bạn về Món ăn</h6>
                <div className="my-4">
                  {loadingCreateReview && <Loading />}
                  {errorCreateReview && (
                    <Message variant="alert-danger">
                      {errorCreateReview}
                    </Message>
                  )}
                </div>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className="my-4">
                      {/* rating  */}
                      <strong>{!rating ? "Rating" : `${rating} sao`}</strong>
                      <div className="star-rating">
                        {[...Array(5)].map((star, index) => {
                          index += 1;
                          return (
                            <button
                              type="button"
                              key={index}
                              className={`${
                                index <= (hover || rating) ? "on" : "off"
                              } btn_rate`}
                              onClick={() => setRating(index)}
                              onMouseEnter={() => setHover(index)}
                              onMouseLeave={() => setHover(rating)}
                            >
                              <span className="star">&#9733;</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="my-4">
                      <strong>Bình luận</strong>
                      <textarea
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <button
                        disabled={loadingCreateReview}
                        className="col-12 bg-black border-0 p-3 rounded text-white"
                      >
                        Đánh Giá
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="my-3">
                    <Message variant={"alert-warning"}>
                      Xin{" "}
                      <Link to="/login">
                        " <strong>Đăng nhập</strong> "
                      </Link>{" "}
                      Viết bài đánh giá{" "}
                    </Message>
                  </div>
                )}
              </div>
            </div>

            {/* RECOMMEND */}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;
