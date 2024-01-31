import React from "react";

const ProductsStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Thống kê Danh Mục</h5>
          <iframe
            style={{background: '#ee4d2d',border: 'none',borderRadius: '2px',boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',width: '40vw',height: '60vh'}}
            src="https://charts.mongodb.com/charts-restaurant-olqtg/embed/dashboards?id=645b58a2-eda7-402b-8452-0bafa5576286&theme=light&autoRefresh=true&maxDataAge=1800&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistics;
