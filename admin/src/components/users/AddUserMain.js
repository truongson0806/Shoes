import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { USER_CREATE_RESET } from "../../Redux/Constants/UserContants";
import { createUser } from "../../Redux/Actions/userActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import axios from "axios";
import Swal from 'sweetalert2'

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddUserMain = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, user } = productCreate;
  const [listAdmin, setListAdmin] = useState([]);
  useEffect(async () => {
    const { data } = await axios.get(`/api/users/admin`);
    setListAdmin(data);
  }, []);
  const handleDeactive=async(id)=>{
    Swal.fire({
      title: 'Bạn có chắc chắn muốn gỡ quản trị user ?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Gỡ',
      denyButtonText: `Huỷ`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.delete(`/api/users/${id}`)
        Swal.fire('Thành Công !', '', 'success')
        setTimeout(()=>{
          location.reload()
        },500)
      } else if (result.isDenied) {
      }
    })
    
  }
  useEffect(() => {
    if (user) {
      toast.success("User Added", ToastObjects);
      dispatch({ type: USER_CREATE_RESET });
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createUser(name, email, password));
    toast.success("Thêm Thành Công")
    setTimeout(()=>{
      location.reload()
    },500)
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/users" className="btn btn-danger text-white">
              Đi đến danh sách người dùng
            </Link>
            <h2 className="content-title">Thêm Người Quản Trị</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Thêm người quản trị
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="user_title" className="form-label">
                      Admin name
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập tên người dùng..."
                      className="form-control"
                      id="user_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="user_email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập Email...."
                      className="form-control"
                      id="user_email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="user_password" className="form-label">
                      password
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập Password...."
                      className="form-control"
                      id="user_password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>

      <section className="content-sub">
        <h2>Danh sách các tài khoản quản trị</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>STT</th>
              <th>Username</th>
              <th>email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listAdmin.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  {item.name=='Admin' ? (<></>):(<button type="button" onClick={()=>{handleDeactive(item._id)}} class="btn btn-warning">
                    Gỡ quản trị
                  </button>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default AddUserMain;
