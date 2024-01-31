import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import randomSequence from "../utils/randomSequence";
import Swal from "sweetalert2";
import nodemailer from "nodemailer";

const StatusScreen = () => {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "tuananka5@gmail.com",
      pass: "ykrikhlarxzeezuw",
    },
  });
  let info = transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  //   const transporter =  nodemailer.createTransport({ // config mail server
  //     service: 'Gmail',
  //     auth: {
  //         user: 'tuananka5@gmail.com',
  //         pass: 'ykrikhlarxzeezuw'
  //     }
  // });
  // const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
  //   from: 'AhaFood',
  //   to: 'tuananh22cm@gmail.com',
  //   subject: 'Thông báo đặt hàng thành công',
  //   text: 'You recieved message from AhaFood' ,
  //   html: '<p>Cảm ơn bạn đã đặt hàng</p>'
  // }
  // transporter.sendMail(mainOptions, function(err, info){
  //   console.log('ah ok')
  //   if (err) {
  //       console.log(err);
  //   } else {
  //       console.log('Message sent: ' +  info.response);
  //   }
  // });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(searchParams.entries());
  const {
    vnp_TransactionNo,
    vnp_Amount,
    vnp_BankCode,
    vnp_PayDate,
    vnp_OrderInfo,
    vnp_TransactionStatus,
  } = params;
  let message =
    params.vnp_TransactionStatus === "00"
      ? "Đơn hàng đang được chuẩn bị và Giao tới bạn ✅"
      : "Giao Dịch Thất Bại ❌";
  let img =
    params.vnp_TransactionStatus === "00" ? "thanhcong.gif" : "thatbai.gif";
  try {
    useEffect(async () => {
      if (vnp_TransactionNo !== "0") {
        await axios.put(`/api/orders/${vnp_OrderInfo}/ispaid`);
        await axios.post("/api/transaction", {
          vnp_TransactionNo,
          vnp_Amount,
          vnp_BankCode,
          vnp_PayDate,
          vnp_OrderInfo,
          vnp_TransactionStatus,
        });
      }
      if (params.vnp_TransactionStatus === "00") {
        //   transporter.sendMail(mainOptions, function(err, info){
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log('Message sent: ' +  info.response);
        //     }
        // });
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Đặt hàng thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Giao dịch không thành công",
          footer: '<a href="">tìm hiểu nguyên nhân ?</a>',
        });
      }
    }, []);
  } catch (error) {
    throw new Error(error);
  }
  return (
    <>
      <Header></Header>
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <h4 className="text-center  mb-2 mb-sm-5">{message}</h4>
          <img
            style={{ width: "60vw", height: "600px", objectFit: "contain" }}
            src={`/images/${img}`}
            alt="Not-found"
          />
          <button className="col-md-3 col-sm-6 col-12 btn btn-success mt-5">
            <Link to="/" className="text-white text-decoration-none">
              Về Trang Chủ
            </Link>
          </button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default StatusScreen;
