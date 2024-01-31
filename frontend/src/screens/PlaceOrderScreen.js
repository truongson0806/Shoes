import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../Redux/Actions/OrderActions";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import Header from "./../components/Header";
import Message from "./../components/LoadingError/Error";
import { useLayoutEffect } from "react";

const PlaceOrderScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const pay = JSON.parse(localStorage.getItem("paymentMethod"));

  // Calculate Price
  const addDecimals = (num) => {
    return Math.round(num * 100) / 100;
  };


    cart.itemsPrice = addDecimals(
      cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    // cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
    cart.shippingPrice = addDecimals(Number(0.15 * cart.itemsPrice));
    cart.totalPrice =
      Number(cart.itemsPrice) +
      Number(cart.shippingPrice) ;
  
  

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useLayoutEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, dispatch, success, order]);

  let carts = JSON.parse(localStorage.getItem("cartItems"));

  const placeOrderHandler = () => {
      dispatch(
        createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: pay === "direct" ? "direct" : "online",
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          // taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
          isPaid: false,
          isDelivery:false,
        })
      );
    
  };

  const renderPrice = (qty, price) => {
    let prices = "";
      prices = price * qty;
    return prices.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  const showPrice = (price) => {
    return price?.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            {/* <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Khách hàng</strong>
                </h5>
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
              </div>
            </div> */}
            <div className="center d-flex justify-content-center flex-column">
            <p style={{fontWeight:'bold',textAlign:'center'}}>Thêm thông tin về Order 🚚</p>
            <textarea name="" id="" placeholder=" Bạn có lưu ý gì   ( ex : ít đường , ít đá) : ..." cols="20" rows="5"></textarea>

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
                <p>Tên khách hàng: {userInfo.name}</p>
                <p>Phone: {cart.shippingAddress.phoneNumber}</p>
                <p>
                  Hình thức thanh toán:{" "}
                  {cart.paymentMethod === "Credit"
                    ? "Thanh toán khi nhận hàng"
                    : "online"}
                </p>
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
                  <strong>Deliver to</strong>
                </h5>
                <p>
                  Địa chỉ nhận hàng: {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {cart.cartItems.length === 0 ? (
              <Message variant="alert-info mt-5">
                Chưa có sản phẩm nào trong giỏ hàng
              </Message>
            ) : (
              <>
                {cart.cartItems.map((item, index) => (
                  <div className="order-product row" key={index}>
                    <div className="col-md-3 col-6">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="col-md-5 col-6 d-flex align-items-center">
                      <Link to={`/products/${item.product}`}>
                        <h6>{item.name}</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                      <h4>Số lượng</h4>
                      <h6>{item.qty}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                      <h4>Tổng</h4>
                      <h6>
                        {item.qty &&
                          renderPrice(
                            item.qty,
                            item.price,
                          )}
                      </h6>
                    </div>
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
                  <td>{showPrice(cart.itemsPrice)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Phí Ship</strong>
                  </td>
                  <td>{showPrice(cart.shippingPrice)} </td>
                </tr>
                <tr>
                  <td>
                    <strong>Tổng</strong>
                  </td>
                  <td>{showPrice(cart.totalPrice)}</td>
                </tr>
              </tbody>
            </table>
            {cart.cartItems.length === 0 ? null : (
              <button type="submit" onClick={() => placeOrderHandler()}>
                Order Ngay 🍜
              </button>
            )}
            {error && (
              <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
