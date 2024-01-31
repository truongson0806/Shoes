import React from "react";
import { Link } from "react-router-dom";
import { PaidOrder } from "../../Redux/Actions/OrderActions";
import { useDispatch, useSelector } from "react-redux";

const OrderDetailProducts = (props) => {
  const { order, loading } = props;
  if (!loading) {
    // Calculate Price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  const dispatch = useDispatch();
  const handleIsPaid = () => {
    dispatch(PaidOrder(order));
    location.reload();
  };
  const renderPrice = (qty, price) => {
    let prices = "";
    prices = price * qty;
    return prices.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  const renderOnePrice = (price) => {
    let prices = "";
    prices = price;

    return prices.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Tên sản phẩm</th>
          <th style={{ width: "20%" }}>Giá</th>
          <th style={{ width: "20%" }}>Số lượng</th>
          <th style={{ width: "20%" }} className="text-end">
            Tổng tiền
          </th>
        </tr>
      </thead>
      <tbody>
        {order.orderItems.map((item, index) => (
          <tr key={index}>
            <td>
              <Link className="itemside" to="#">
                <div className="left">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "40px", height: "40px" }}
                    className="img-xs"
                  />
                </div>
                <div className="info">{item.name}</div>
              </Link>
            </td>
            <td>{renderOnePrice(item.price)}</td>
            <td>{item.qty} </td>
            <td className="text-end"> {renderPrice(item.qty, item.price)}</td>
          </tr>
        ))}

        <tr>
          <td colSpan="4">
            <article className="float-end">
              <dl className="dlist">
                <dt>Subtotal:</dt> <dd>{order.itemsPrice}</dd>
              </dl>
              <dl className="dlist">
                <dt>Phí ship:</dt> <dd>{order.shippingPrice}</dd>
              </dl>
              <dl className="dlist">
                <dt>Thuế:</dt> <dd>{order.taxPrice}</dd>
              </dl>
              <dl className="dlist">
                <dt>Tổng thanh toán:</dt>
                <dd>
                  <b className="h5">{order.totalPrice}</b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Trạng thái:</dt>
                <dd>
                  {order.isPaid ? (
                    <span className="paid badge rounded-pill alert alert-success text-success ">
                      Đã thanh toán
                    </span>
                  ) : (
                    <>
                      <span
                        className="paid badge rounded-pill alert alert-danger text-danger"
                        
                      >
                        Chưa Thanh Toán
                      </span>
                      <br />
                      <button type="button" class="btn btn-warning" onClick={handleIsPaid}>Xác Nhận Đã Thanh Toán</button>
                    </>
                  )}
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
