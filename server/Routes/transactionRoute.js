import express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect } from "../Middleware/AuthMiddleware.js";
import Order from "./../Models/OrderModel.js";
import User from "../Models/UserModel.js";
import Transaction from "../Models/TransactionModel.js";
import crypto from "crypto";
import moment from "moment";
import querystring from "qs";
import mailer from "../utils/mailer.js";
import dateFormat from "dateformat";
const TransactionRoute = express.Router();

//GET TRANSACTION
TransactionRoute.get( 
  "/all",
  asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({}).sort({ _id: -1 });
    // .populate("user", "id name email");
    res.json(transactions);
  })
);

//CREATE TRANSACTION
TransactionRoute.post(
  "/",
  // protect,
  asyncHandler(async (req, res) => {
    let {
      vnp_TransactionNo: idTransactionVNPay,
      vnp_Amount: amount,
      vnp_BankCode: bankCode,
      vnp_PayDate: thoiGianThanhToan,
      vnp_OrderInfo: maOrder,
      vnp_TransactionStatus: transactionStatus,
    } = req.body;

    idTransactionVNPay = Number(idTransactionVNPay);
    amount = Number(amount);
    thoiGianThanhToan = moment(thoiGianThanhToan, "YYYYMMDDHHmmss").toDate();

    const createTransaction = await Transaction.create({
      idTransactionVNPay,
      amount: amount / 100,
      bankCode,
      thoiGianThanhToan,
      maOrder,
      transactionStatus,
    });
    if (createTransaction) {
      res.status(201).json(createTransaction);
    } else {
      res.status(400);
      throw new Error("Invalid transaction");
    }
  })
);

TransactionRoute.post(
  "/create_payment_url",
  asyncHandler(async (req, res) => {
    var tmnCode = "Q4M14LB2";
    var secretKey = "JRZLABOOOXUPSGRRTMTIBNCZBUCLGHIJ";
    var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    var returnUrl = "http://localhost:3000/transaction/vnpay_response";

    var date = new Date();

    let createDate = moment(date).format("YYYYMMDDHHmmss");

    let orderId = moment(date).format("DDHHmmss");

    var amount = req.body.amount;
    var bankCode = "NCB";

    var orderInfo = req.body.orderId;
    var orderType = "other";
    var locale = "VN";
    if (locale === null || locale === "") {
      locale = "vn";
    }
    var currCode = "VND";
    var vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = "127.0.0.1";
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }
    vnp_Params = sortObject(vnp_Params);
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
    res.json(vnpUrl);
  })
);

// https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=1806000&vnp_Command=pay&vnp_CreateDate=20210801153333&vnp_CurrCode=VND&vnp_IpAddr=127.0.0.1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang+%3A5&vnp_OrderType=other&vnp_ReturnUrl=https%3A%2F%2Fdomainmerchant.vn%2FReturnUrl&vnp_TmnCode=DEMOV210&vnp_TxnRef=5&vnp_Version=2.1.0&vnp_SecureHash=3e0d61a0c0534b2e36680b3f7277743e8784cc4e1d68fa7d276e79c23be7d6318d338b477910a27992f5057bb1582bd44bd82ae8009ffaf6d141219218625c42
// https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=10000&vnp_Command=pay&vnp_CreateDate=20240108210105&vnp_CurrCode=VND&vnp_Locale=VN&vnp_OrderInfo=1&vnp_OrderType=other&vnp_ReturnUrl=http%3A%2F%2Flocalhost%3A3000%2Ftransaction%2Fvnpay_response&vnp_TmnCode=94DRFLFT&vnp_TxnRef=210105&vnp_Version=2.1.0&vnp_SecureHash=9751ba6a0b8a7d4220efe58606f1bea7d7aafc03442e6303bcf681caaa085dfbe70212f23e4ec6d5f0c9f410ed70b474c7fbbe5a79f3dc92c1129e39472db4a9
// Show Result

TransactionRoute.get("/vnpay_return", function (req, res, next) {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];
  vnp_Params = sortObject(vnp_Params);
  let tmnCode = "4DE71C36";
  let secretKey = "RSTGQWIJGQPATNBFKXRGPFEXDGLCDXTT";
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
    res.send("success", { code: vnp_Params["vnp_ResponseCode"] });
  } else {
    res.send("success", { code: "97" });
  }
});

// add transaction to database
TransactionRoute.get("/vnpay_response", function (req, res, next) {
  console.log("ok babi");
  mailer.sendMail(
    "tuananh22cm@gmail.com",
    "veriry ",
    "<h1>cam on ban da dat hang</h1>"
  );
  let vnp_Params = req.query;
  console.log("vnp_Params");
  let secureHash = vnp_Params["vnp_SecureHash"];

  let orderId = vnp_Params["vnp_TxnRef"];
  let rspCode = vnp_Params["vnp_ResponseCode"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  let config = require("config");
  let secretKey = config.get("vnp_HashSecret");
  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  let paymentStatus = "0"; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
  //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
  //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

  let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
  let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
  if (secureHash === signed) {
    //kiểm tra checksum
    if (checkOrderId) {
      if (checkAmount) {
        if (paymentStatus == "0") {
          //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
          if (rspCode == "00") {
            //thanh cong
            //paymentStatus = '1'
            // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn

            res.status(200).json({ RspCode: "00", Message: "Success" });
          } else {
            //that bai
            //paymentStatus = '2'
            // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
            res.status(200).json({ RspCode: "00", Message: "Success" });
          }
        } else {
          res.status(200).json({
            RspCode: "02",
            Message: "This order has been updated to the payment status",
          });
        }
      } else {
        res.status(200).json({ RspCode: "04", Message: "Amount invalid" });
      }
    } else {
      res.status(200).json({ RspCode: "01", Message: "Order not found" });
    }
  } else {
    res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
  }
});
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
export default TransactionRoute;
