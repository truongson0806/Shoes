import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Header from "./../components/Header";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import {
  deliveryOrder,
  getOrderDetails,
  payOrder,
} from "../Redux/Actions/OrderActions";
import Loading from "./../components/LoadingError/Loading";
import Message from "./../components/LoadingError/Error";
import moment from "moment";
import axios from "axios";
import { ORDER_PAY_RESET } from "../Redux/Constants/OrderConstants";
import showPrice from "../utils/showPrice";
import { useLayoutEffect } from "react";

const OrderScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  console.log(order);
  const handleDelivery = () => {
    dispatch(deliveryOrder(orderId));
    order.isDelivered = true;
    location.reload();
  };
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    const addDecimals = (num) => {
      return Math.round(num * 100) / 100;
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useLayoutEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const totalPrice = order?.totalPrice;

  const handlePayment = async () => {
    try {
      const data = await axios.post(
        "/api/transaction/create_payment_url",
        { amount: totalPrice, orderId },
        config
      );
      window.location.replace(data.data);
    } catch (error) {
      throw new Error("error");
    }
  };
  const renderPrice = (qty, price) => {
    let prices = price * qty;

    return prices.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <>
      <Header />
      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row  order-detail">
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  {!order.isDelivered ? (
                    <div className="center">
                      <h3 style={{ fontStyle: "italic", color: "#ee4d2d" }}>
                        Relax , we're preparing !
                      </h3>
                      <img
                        src={`/images/cooking.gif`}
                        alt="cooking"
                        width={300}
                      />
                    </div>
                  ) : (
                    <div className="center">
                      <h3 style={{ fontStyle: "italic", color: "#ee4d2d" }}>
                        Đơn hàng đã hoàn tất !
                      </h3>
                      <img
                        src={`/images/ratingUs.gif`}
                        alt="rating"
                        width={200}
                      />
                    </div>
                  )}

                  {/* <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Khách hàng</strong>
                    </h5>
                    <p>{order.user.name}</p>
                    <p>
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </p>
                  </div> */}
                </div>
              </div>
              {/* 2 */}
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-truck-moving"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Thông tin đơn hàng</strong>
                    </h5>
                    <p>Tên khách hàng: {order.user.name}</p>
                    <p>phone: {order.shippingAddress.phoneNumber}</p>
                    <p>Thanh toán: {order.paymentMethod}</p>
                    {order.isPaid ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Đã thanh toán {moment(order.paidAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Chưa thanh toán
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* 3 */}
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Giao Tới</strong>
                    </h5>
                    <p>
                      Địa Chỉ: {order.shippingAddress.city},{" "}
                      {order.shippingAddress.address},{" "}
                    </p>
                    {order.isDelivered ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Giao hàng lúc {moment(order.deliveredAt).calendar()}
                        </p>
                        {/* <button className="bg-light text-pimary border-0" onClick={handleDelivery}>Đánh giá sản phẩm </button> */}
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start text-center">
                          Chưa Giao
                        </p>
                        <button
                          className="bg-light text-danger border-0"
                          onClick={handleDelivery}
                        >
                          Đã Nhận Được Hàng
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row order-products justify-content-between">
              <div className="col-lg-8">
                {order.orderItems.length === 0 ? (
                  <Message variant="alert-info mt-5">
                    Chưa có đơn đặt hàng
                  </Message>
                ) : (
                  <>
                    {order.orderItems.map((item, index) => (
                      <div className="order-product row" key={index}>
                        <div className="col-md-3 col-6">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="col-md-3 col-6 d-flex align-items-center">
                          <Link to={`/products/${item.product}`}>
                            <h6>{item.name}</h6>
                          </Link>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                          <h4>Số lượng</h4>
                          <h6>{item.qty}</h6>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                          <h4>Tổng đơn hàng</h4>
                          <h6>
                            {item.qty && renderPrice(item.qty, item.price)}
                          </h6>
                        </div>
                        {order.isDelivered ? (<div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                          <h6>
                            <Link
                              className="btn btn-warning"
                              to={`/products/${item.product}`}
                            >
                              Đánh Giá
                            </Link>
                          </h6>
                        </div>):(<></>)}
                      </div>
                    ))}
                  </>
                )}
              </div>
              {/* total */}
              <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Sản phẩm</strong>
                      </td>
                      <td>{showPrice(order.itemsPrice)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Phí Ship</strong>
                      </td>
                      <td>{showPrice(order.shippingPrice)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tổng</strong>
                      </td>
                      <td>{showPrice(order.totalPrice)}</td>
                    </tr>
                  </tbody>
                </table>
                {!order.isPaid && order.paymentMethod !== "direct" && (
                  <>
                    <div className="col-12">
                      <button onClick={handlePayment}>
                        Thanh Toán Với VNPAY
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderScreen;
