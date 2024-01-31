import { useState, useEffect } from "react";
import { imageUpload, imageShow } from "../../ulities/imageUpload";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const Slide = () => {
  const [form, setForm] = useState({
    linkImg: "",
    linkPage: "",
    isShow: false,
  });
  const [idUpdate, setIdUpdate] = useState(-1);
  const [isUpdate, setIsUpdate] = useState(false);
  const [listBanner, setListBanner] = useState([]);

  const handleChangeForm = (tag, data) => {
    setForm({
      ...form,
      [tag]: data,
    });
  };

  useEffect(() => {
    new Promise(async () => {
      await initData();
    });
  }, []);

  const initData = async () => {
    const res = await axios.get("/api/category/all/banner");
    if (res.status == 200) {
      setListBanner(res.data);
    }
  };
  const uploadData = async (e) => {
    const file = e.target.files[0];
    const image = await imageUpload(file);
    if (image) {
      setForm({
        ...form,
        linkImg: image,
      });
    }
  };

  const handleUpdateImg = async () => {
    if (form.linkImg === "" || form.linkPage === "") {
      toast.error("Vui lòng không để trống");
    } else {
      const res = await axios.put(`/api/category/banner/${idUpdate}`, form);
      if (res.status === 200) {
        toast.success("Thành Công");
        setForm({
          linkImg: "",
          linkPage: "",
          isShow: false,
        });
        await initData();
      }
    }
  };

  const handleUploadImg = async () => {
    if (form.linkImg === "" || form.linkPage === "") {
      toast.error("Vui lòng không để trống");
    } else {
      const res = await axios.post("/api/category/banner", form);
      if (res.status === 200) {
        toast.success("Thành Công");
        setForm({
          linkImg: "",
          linkPage: "",
          isShow: false,
        });
        await initData();
      }
    }
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`/api/category/banner/delete/${id}`);
    if (res.status === 200) {
      toast.success("Xóa Thành Công");
      await initData();
    }
  };

  const handleEdit = async (id) => {
    const res = await axios.get(`/api/category/banner-detail/${id}`);
    if (res.status === 200) {
      setForm({
        linkImg: res.data.linkImg,
        linkPage: res.data.linkPage,
        isShow: false,
      });
      setIdUpdate(res.data._id);
      setIsUpdate(true);
    }
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">BANNER SẢN PHẨM</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <form>
                <div className="mb-4">
                  <label htmlFor="product_name" className="form-label">
                    Đường Dẫn Đến Danh Mục
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="form-control py-3"
                    id="product_name"
                    onChange={(e) =>
                      handleChangeForm("linkPage", e.target.value)
                    }
                    value={form.linkPage}
                  />
                </div>
                {/* <div className="mb-4">
                  <label className="form-label">Hiển Thị</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={form.isShow ? true : false}
                      onChange={(e) => handleChangeForm("isShow", !form.isShow)}
                    />
                  </div>
                </div> */}
                <div className="mb-4">
                  <label className="form-label">Upload Ảnh</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => uploadData(e)}
                  />
                  {form.linkImg && imageShow(form.linkImg)}
                </div>
              </form>
              {form.linkImg &&
                (isUpdate ? (
                  <button className="btn btn-success" onClick={handleUpdateImg}>
                    Cập Nhật
                  </button>
                ) : (
                  <button className="btn btn-success" onClick={handleUploadImg}>
                    Upload Ảnh
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="content-header">
        <h2 className="content-title" style={{ marginTop: "30px" }}>
          Danh Sách Banner
        </h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Link File</th>
                  <th>Hình Ảnh</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              {/* Table Data */}
              <tbody>
                {listBanner?.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index}</td>
                    <td>
                      <a href={item.linkPage}>
                        <b>Link</b>
                      </a>
                    </td>
                    <td>
                      <img
                        src={item.linkImg}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                        alt=""
                      />
                    </td>
                    <td className="text-end">
                      <div className="dropdown">
                        <Link
                          to="#"
                          data-bs-toggle="dropdown"
                          className="btn btn-light"
                        >
                          <i className="fas fa-ellipsis-h"></i>
                        </Link>
                        <div className="dropdown-menu">
                          {/* <div
                            className="dropdown-item"
                            onClick={() => handleEdit(item._id)}
                          >
                            Chỉnh sửa
                          </div> */}
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => handleDelete(item._id)}
                            style={{cursor:'pointer'}}
                          >
                            Xóa 🛑
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slide;
