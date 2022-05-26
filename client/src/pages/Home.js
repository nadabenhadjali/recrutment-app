import React from "react";
import "../App.css";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import Slider from "../components/Slider";
function Home() {
  return (
    <div>
      <Slider />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
