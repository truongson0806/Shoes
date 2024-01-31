import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  if (userInfo.isAdmin) {
    return (
      <div>
        <aside className="navbar-aside" id="offcanvas_aside">
          <div className="aside-top">
            <Link to="/" className="brand-wrap">
              <img
                src="/images/logoPage.jpg"
                style={{ height: "46" }}
                className="logo"
                alt="Ecommerce dashboard template"
              />
            </Link>
            <div>
              <button className="btn btn-icon btn-aside-minimize">
                <i className="text-muted fas fa-stream"></i>
              </button>
            </div>
          </div>

          <nav>
            <ul className="menu-aside">
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/"
                  exact={true}
                >
                  <i className="icon fas fa-home"></i>
                  <span className="text">Dashboard</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/products"
                >
                  <i className="icon fas fa-shopping-bag"></i>
                  <span className="text">Sản phẩm</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/addproduct"
                >
                  <i className="icon fas fa-cart-plus"></i>
                  <span className="text">Thêm sản phẩm</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/category"
                >
                  <i className="icon fas fa-list"></i>
                  <span className="text">Danh mục</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/orders"
                >
                  <i className="icon fas fa-bags-shopping"></i>
                  <span className="text">Đơn hàng</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/users"
                >
                  <i className="icon fas fa-user"></i>
                  <span className="text">Người dùng</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/slide"
                >
                  <i className="icon fas fa-store-alt"></i>
                  <span className="text">Banner</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link "
                  to="/transaction"
                >
                  <i className="icon fas fa-usd-circle"></i>
                  <span className="text">Giao dịch</span>
                </NavLink>
              </li>
            </ul>
            <br />
            <br />
          </nav>
        </aside>
      </div>
    );
  } else {
    return (
      <div>
        <aside className="navbar-aside" id="offcanvas_aside">
          <div className="aside-top">
            <Link to="/" className="brand-wrap">
              <img
                src="https://yt3.googleusercontent.com/LmvbrWF4R7G5neK2adsSx3gwgdV7sbz5aG9MpRJSLRswvK5xYgt0kflRqPofKICdrgyRn95jVg=s900-c-k-c0x00ffffff-no-rj"
                style={{ height: "46" }}
                className="logo"
                alt="Ecommerce dashboard template"
              />
            </Link>
            <div>
              <button className="btn btn-icon btn-aside-minimize">
                <i className="text-muted fas fa-stream"></i>
              </button>
            </div>
          </div>

          <nav>
            <ul className="menu-aside">
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/"
                  exact={true}
                >
                  <i className="icon fas fa-home"></i>
                  <span className="text">Dashboard</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/products"
                >
                  <i className="icon fas fa-shopping-bag"></i>
                  <span className="text">Sản phẩm</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/addproduct"
                >
                  <i className="icon fas fa-cart-plus"></i>
                  <span className="text">Thêm sản phẩm</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/orders"
                >
                  <i className="icon fas fa-bags-shopping"></i>
                  <span className="text">Đơn hàng</span>
                </NavLink>
              </li>
            </ul>
            <br />
            <br />
          </nav>
        </aside>
      </div>
    );
  }
};

export default Sidebar;
