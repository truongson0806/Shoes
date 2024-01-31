import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listUser,
  deleteUser,
  updateUserToEmployee,
} from "../../Redux/Actions/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Swal from "sweetalert2";
import Avatar from "react-avatar";
import axios from "axios";

const UserComponent = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  console.log(users);
  let listData = [];
  if (users) {
    listData = users.filter((i) => i.isAdmin != true);
  }

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  const deletehandler = async (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xoá user ?",
      showDenyButton: true,
      confirmButtonText: "Xoá",
      denyButtonText: `Huỷ`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/users/${id}`);
        Swal.fire("Thành Công !", "", "success");
        setTimeout(() => {
          location.reload();
        }, 500);
      } else if (result.isDenied) {
      }
    });
  };
  const upToEmployee = async (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn đưa user lên làm nhân viên ?",
      showDenyButton: true,
      confirmButtonText: "Có",
      denyButtonText: `Huỷ`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`/api/users/upToEmployee/${id}`);
        Swal.fire("Thành Công !", "", "success");
        setTimeout(() => {
          location.reload();
        }, 500);
      } else if (result.isDenied) {
      }
    });
  };
  const downToUsers = async (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn hạ quyền nhân viên ?",
      showDenyButton: true,
      confirmButtonText: "Có",
      denyButtonText: `Huỷ`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`/api/users/downToUser/${id}`);
        Swal.fire("Thành Công !", "", "success");
        setTimeout(() => {
          location.reload();
        }, 500);
      } else if (result.isDenied) {
      }
    });
  };
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Người dùng</h2>
        <div>
          <Link to="/adduser" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Thêm mới người quản trị
          </Link>
        </div>
        <div>
          <Link to="/addemployee" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Thêm nhân viên
          </Link>
        </div>
      </div>

      <div className="card mb-4">
        {/* <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
                <option>Show all</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Trạng thái: Xem tất cả</option>
                <option>Active only</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>
        </header> */}

        {/* Card */}
        <div className="card-body">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {listData.map((user) => (
                <div className="col" key={user._id}>
                  <div className="card card-user shadow-sm">
                    <div className="card-header">
                      {/* <img
                        className="img-md img-avatar"
                        src="/images/favicon.png"
                        alt="User pic"
                      /> */}
                      <Avatar round={true} name={user.name}></Avatar>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title mt-5">{user.name}</h5>
                      <div className="card-text text-muted">
                        {user.isAdmin === true ? (
                          <p className="m-0">Admin</p>
                        ) : user.isEmployee === true ? (
                          <p className="m-0">Employee</p>
                        ) : (
                          <p className="m-0">User</p>
                        )}
                        <p>
                          <a href={`mailto:${user.email}`}>{user.email}</a>
                        </p>

                        <div className="row d-flex justify-content-center">
                          {user.isEmployee === true ? (
                            <Link
                              to="#"
                              onClick={() => downToUsers(user._id)}
                              className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-5 me-2"
                            >
                              <i class="fas fa-solid fa-user-minus"></i>
                            </Link>
                          ) : (
                            <Link
                              to="#"
                              onClick={() => upToEmployee(user._id)}
                              className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-5 me-2"
                            >
                              <i class="fas fa-solid fa-user-plus"></i>
                            </Link>
                          )}
                          <Link
                            to="#"
                            onClick={() => deletehandler(user._id)}
                            className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-5"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* nav */}
          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default UserComponent;
