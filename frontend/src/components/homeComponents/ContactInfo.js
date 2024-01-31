import React from "react";

const ContactInfo = () => {
  return (
    <div className="contactInfo container">
      <div className="row">
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h5>Facebook</h5>
            <a href="">
              <p>Aha Shoe</p>
            </a>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h5>Vị trí</h5>
            <a href="https://goo.gl/maps/1BtmWsWyZQBZMrdB9">
              <p className="location">41A - Phú Diễn - BTL - Hà Nội</p>
            </a>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-fax"></i>
            </div>
            <h5>Zalo</h5>
            <a href="https://zalo.me/012345678">
              <p>088 888 8888</p>
            </a>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d18723.783923447434!2d105.79827383950587!3d21.023807901534642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1687021395900!5m2!1svi!2s"
          width="2000"
          height="550"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactInfo;
