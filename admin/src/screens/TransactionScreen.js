import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import TransactionMain from "../components/Transaction/TransactionMain";

const TransactionScreen = () => {
  return (
    <>
    <Sidebar />
    <main className="main-wrap">
      <Header />
      <TransactionMain />
    </main>
  </>
  )
}

export default TransactionScreen