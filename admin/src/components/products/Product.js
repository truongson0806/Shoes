import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../Redux/Actions/ProductActions";
import Swal from 'sweetalert2'

const Product = (props) => {
  const { product } = props;
  const dispatch = useDispatch();

  const deletehandler = (id) => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xoá ?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Xoá',
      denyButtonText: `Huỷ`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Xoá !', '', 'success')
        dispatch(deleteProduct(id));
      } else if (result.isDenied) {
      }
    })
    // if (window.confirm("Are you sure??")) {
    //   dispatch(deleteProduct(id));
    // }
  };

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          
          <Link to={`/product/${product._id}/detail`} className="img-wrap">
            <img src={product.image} alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {product.name} 
            </Link>
            <div className="price mb-2">{product.price}VND</div>
            <div className="row">
              <Link
                to={`/product/${product._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deletehandler(product._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
