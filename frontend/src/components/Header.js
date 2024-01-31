import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userActions";
import { listProduct, listSearch } from "..//Redux/Actions/ProductActions";
import store from "../Redux/store";
import { debounce } from "lodash";
import Loading from "./LoadingError/Loading";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const [displayImgPreview, setDisplayImgPreview] = useState(true);
  const [isOpenSearchPreview, setIsOpenSearchPreview] = useState(false);
  const handleSearchPreview = () => {};
  const handleOpenPreview = () => {
    setIsOpenSearchPreview(true);
  };
  const handleClosePreview = () => {
    setIsOpenSearchPreview(false);
  };
  const dispatch = useDispatch();
  let history = useHistory();
  const [productListSearch, setProductListSearch] = useState([]);
  const dataListProduct = useSelector((state) => state.productList);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [listStore, setListStore] = useState(
    JSON.parse(localStorage.getItem("favorite")) || []
  );
  const logoutHandler = () => {
    dispatch(logout());
  };
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  console.log(loading, products);
  // useEffect(() => {
  //   listStore = JSON.parse(localStorage.getItem('favorite'))|| 0;
  // },[JSON.parse(JSON.stringify(listStore))])

  const debounceSearch = useCallback(
    debounce((nextValue) => dispatch(listProduct(nextValue)), 800),
    []
  );
  const handleChange = async (e) => {
    setKeyword(e.target.value);
    keyword.trim();
    debounceSearch(keyword);
    if (e.target.value == "") {
      setDisplayImgPreview(true);
    } else {
      setDisplayImgPreview(false);
    }

    // setProductListSearch(dataListProduct)
    // const { loading, error, products } = productListSearch;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    keyword.trim();
    dispatch(listSearch(keyword));
    history.push(`/search/${keyword}`);
  };
  return (
    <div>
      {/* Top Header */}
      <div className="Announcement ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>+84 123 456 789</p>
              <p>ahashoe@gmail.com</p>
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <Link to="">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link to="">
                <i className="fab fa-pinterest-p"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img alt="logo" src="/images/logoPage.jpg" />
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {userInfo ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          Trang cá nhân
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={logoutHandler}
                        >
                          Đăng xuất
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/login">
                          Đăng nhập
                        </Link>

                        <Link className="dropdown-item" to="/register">
                          Đăng ký
                        </Link>
                      </div>
                    </div>
                  )}

                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{cartItems.length}</span>
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form onSubmit={submitHandler} className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Search"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center mb-4">
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/logoPage.jpg" />
                </Link>
              </div>

              <div className="col-md-6 col-8 d-flex align-items-center search__form-main">
                <form onSubmit={submitHandler} className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Tìm kiếm sản phẩm...."
                    onChange={(e) => handleChange(e)}
                    value={keyword}
                    onFocus={handleOpenPreview}
                    // onBlur={handleClosePreview}
                  />
                  <button type="submit" class="btn btn-success">
                    <i class="fas fa-search"></i>
                  </button>
                  {isOpenSearchPreview ? (
                    <div
                      className="search__preview"
                      onClick={handleSearchPreview}
                    >
                      <span
                        onClick={handleClosePreview}
                        style={{
                          float: "right",
                          margin: "20px",
                          cursor: "pointer",
                        }}
                      >
                        ❌
                      </span>
                      {displayImgPreview ? (
                        <div
                          style={{
                            padding: 20,
                            color: "#ee4d2d",
                            fontStyle: "italic",
                            textShadow: "0 0 3px #FF0000, 0 0 5px #0000FF",
                            textAlign: "center",
                          }}
                        >
                          <h2>Mua gì nào ?</h2>
                        </div>
                      ) : loading ? (
                        <loading />
                      ) : store.getState().productList.products.length != 0 ? (
                        <div className="preview_list">
                          {products.map((item, index) => (
                            <div
                              className="preview_item"
                              style={{
                                marginLeft: "10px",
                                marginBottom: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                                transaction: "1s",
                              }}
                            >
                              <Link to={`/products/${item._id}`}>
                                <img
                                  src={item.image}
                                  width={50}
                                  alt={item.name}
                                  style={{ margin: "5px", transaction: "1s" }}
                                />
                                <span>{item.name}</span>
                              </Link>
                              {/* <i class="fa-solid fa-paper-plane" style={{cursor:'pointer'}}></i> */}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          <p
                            style={{
                              fontSize: "40px",
                              color: "#fff",
                              textAlign: "center",
                              marginTop: "30px",
                            }}
                          >
                            Not Found 📛
                          </p>
                          {/* <img src="/images/notfoundsearch.png" width={300} alt="not found" /> */}
                        </>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </form>
              </div>

              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {userInfo ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Xin chào, {userInfo.name}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Trang cá nhân
                      </Link>

                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        Đăng xuất
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/register">Đăng ký</Link>
                    <Link to="/login">Đăng nhập</Link>
                  </>
                )}
                <Link to="/cart">
                  <i className="fas fa-shopping-bag"></i>
                  <span className="badge">{cartItems.length}</span>
                </Link>
                <Link to="/favorite">
                  <i className="fas fa-heart"></i>
                  <span className="badge">
                    {listStore.length ? listStore.length : 0}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
