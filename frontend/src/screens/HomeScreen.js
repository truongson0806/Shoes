import React, { useState } from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import LovingSection from "../components/homeComponents/LovingSection";
import Footer from "../components/Footer";
import Description from "../components/homeComponents/Description";

const HomeScreen = ({ match }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", toggleVisible);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <div>
      <div className="Btn_ScrollToTop" onClick={scrollToTop}
          style={{ display: visible ? "inline" : "none" }}>
        ☝🏻
      </div>
      <Header />
      <ShopSection keyword={keyword} pagenumber={pagenumber} />
      
      <LovingSection/>
      <Description />
      <ContactInfo />
      <Footer/>
    </div>
  );
};

export default HomeScreen;
