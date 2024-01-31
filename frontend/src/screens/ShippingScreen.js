import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { saveShippingAddress } from "../Redux/Actions/cartActions";

const ShippingScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phone);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city,phoneNumber}));
    history.push("/payment");
  };
  return (
    <>
      <Header />
      <div className="row">
      <div className="col-6 d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
           <h6>Nhập Thông Tin Giao Hàng</h6>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {/* <h6>Địa chỉ giao hàng</h6> */}
          <input
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
          
          <button type="submit">Tiếp tục</button>
        </form>
      </div>
      <div className="col-6">
        <img src={ `/images/shipping.gif`} alt="ship" />
      </div>
      </div>
    </>
  );
};

export default ShippingScreen;
