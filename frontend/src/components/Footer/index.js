import React from "react";
import styles from "../Footer/Footer.module.css";


function Footer() {
  return (
    <div className={styles.Footer}>
        <div className={styles.Footer__header}></div>
      <div className={styles.container}>
        <div className={`${styles["Footer__customerCare"]} ${styles.column__container}`}>
          <h5>Customer Care</h5>
          <ul>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Our Blog</a>
            </li>
            <li>
              <a href="#">How to Buy</a>
            </li>
            <li>
              <a href="#">Payment</a>
            </li>
            <li>
              <a href="#">Shipment</a>
            </li>
            <li>
              <a href="#">Returns and Refunds</a>
            </li>
            <li>
              <a href="#">Warranty Policy</a>
            </li>
          </ul>
        </div>
        <div className={`${styles["Footer__aboutUs"]} ${styles.column__container}`}>
          <h5>About Us</h5>
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Recruit</a>
            </li>
            <li>
              <a href="#">Our Terms</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Flash Sale</a>
            </li>
            <li>
              <a href="#">Marketing</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className={styles["Footer__PaymentAndShipment"]}>
          <div className={styles.Footer__Payment}>
            <h5>Payment Method</h5>
            <img src='/images/footer/payment.png' alt="payment" />
          </div>
          <div className={styles.Footer__Shipment}>
            <h5>Shipment</h5>
            <img src='/images/footer/shipment.png' alt="shipment" />
          </div>
        </div>
        <div className={`${styles["Footer__social"]} ${styles.column__container}`}>
          <h5>Follow Us</h5>
          <ul>
            <li>
              <a href="#">
                <i class="fa-brands fa-facebook"></i> FaceBook
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa-brands fa-square-instagram"></i> Instagram
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa-brands fa-linkedin"></i> Linked
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa-brands fa-square-twitter"></i> Twitter
              </a>
            </li>
          </ul>
        </div>
        <div className={styles["Footer__download"]}>
          <h5>Download Our Mobile App</h5>
          <div className={styles.Footer__download__img}>
            <div className={styles.Footer__download__left}>
              <img src='/images/footer/qrcode.png' alt="qrcode" />
            </div>
            <div className={styles.Footer__download__right}>
              <img src='/images/footer/appstore.png' alt="appstore" />
              <img src='/images/footer/chplay.png' alt="chplay" />
              <img src='/images/footer/gallery.png' alt="gallery" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.Footer__footer}>
        <p>© 2022 All Right Reserved</p>
        <div className={styles.Footer__footer__country}>
            <p>Country and Region : </p>
            <ul>
                <li>Indonesia</li>
                <li>America</li>
                <li>Germany</li>
                <li>Thailand</li>
                <li>Russia</li>
                <li>Japan</li>
                <li>China</li>
                <li>VietNam</li>
            </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
