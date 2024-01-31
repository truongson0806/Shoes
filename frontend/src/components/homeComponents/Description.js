import React from "react";

const Description = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 ">
            <div className="box-info d-flex justify-content-center align-items-center">
              <img src={`/images/foodDescription.gif`} width={200} alt="a" />
              <h3>Đảm bảo chất lượng</h3>
              <p style={{ color: "#676767", textAlign: "center" }}>
                Chúng tôi đảm bảo đem đến trải nghiệm tốt nhất cho các bạn{" "}
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 ">
            <div className="box-info d-flex justify-content-center align-items-center">
              <img
                src={`/images/foodDescription2.gif`}
                width={200}
                alt="a"
                style={{ marginBottom: "20px" }}
              />
              <h3>Trải nghiệm ứng dụng AhaShoe</h3>
              <p style={{ color: "#676767", textAlign: "center" }}>
                Download ứng dụng trên Google Play hoặc AppStore{" "}
              </p>
              <div style={{ display: "flex", marginTop: "20px" }}>
                <img
                  style={{ marginRight: "20px" }}
                  src={`/images/ggplaySvg.svg`}
                  alt="gg"
                />
                <img src={`/images/appstoreSvg.svg`} alt="appstore" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p
        style={{
          textAlign: "center",
          color: "#ee4d2d",
          marginTop: "30px",
          fontSize: "15px",
        }}
      >
        We're always working to get the most accurate information. Let us know
        if you come across anything that's outdated!
      </p>
    </div>
  );
};

export default Description;
