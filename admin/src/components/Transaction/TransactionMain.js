import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../Redux/Url";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { listTransactions } from '../../Redux/Actions/TransactionAction';
import Transactions from './Transactions';

const TransactionMain = () => {
  const transactionList = useSelector((state) => state.transactionList);
  const { loading, error, transactions } = transactionList;
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(listTransactions());
  }, [dispatch]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh sách giao dịch</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control p-2"
                // value={search}
                onChange={(e) => handleSearch(e)}
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              {/* <select
                className="form-select"
                onChange={(e) => handleChangeStatus(e)}
              >
                <option value="default">Trạng thái</option>
                <option value="choxuli">Thành công</option>
                <option value="dahoanthanh">Thất bại</option>
              </select> */}
            </div>

            <div className="col-lg-2 col-6 col-md-3"></div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Transactions transactions={transactions} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TransactionMain