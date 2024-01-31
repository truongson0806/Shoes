import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainProducts from "./../components/products/MainProducts";
import DetailProduct from "../components/products/DetailProduct";

const ReviewScreen = ({match}) => {
  const productId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <DetailProduct productId={productId}/>
      </main>
    </>
  );
};

export default ReviewScreen;


