import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import randomSequence from "../../ulities/randomSequence";

const Transactions = ({transactions}) => {
  return (
    <>
    <table className="table">
 <thead>
   <tr>
     <th scope="col">Mã Giao dịch</th>
     <th scope="col">Số lượng</th>
     <th scope="col">Ngân hàng</th>
     <th scope="col">Thời gian</th>
     <th scope="col">Mã Order</th>
     <th scope="col">Trạng thái</th>
     {/* <th scope="col" className="text-end">
       Action
     </th> */}
   </tr>
 </thead>
 <tbody>
   {transactions.map((transaction) => (
     <tr key={transaction._id}>
       <td>
         <b>{transaction.idTransactionVNPay}</b>
       </td>
       <td>{transaction.amount}</td>
       <td>{transaction.bankCode}</td>
       <td>{moment(transaction.thoiGianThanhToan).format("MMM Do YY")}</td>
       <td>{transaction.maOrder}</td>
       <td>{transaction.transactionStatus=='00' ? (<span style={{color:'green'}}>Thành công</span>) : (<span style={{color:"red"}}>Thất bại</span>)}</td>
     </tr>
   ))}
 </tbody>
</table>
</>
  )
}

export default Transactions