import React from "react";
import "../App.css";
import MapSection from "../components/map";
import ContactSection from "../components/contactSection";
import "../App.css";

function Contactus() {
  const location = {
    address: "A06 - Immeuble Bouhajeb, 1 Av. de Yasser Arafat, Sousse 4050",
    lat: 35.834272,
    lng: 10.593374,
  };

  return (
    <div>
      {/*<MapSection location={location} zoomLevel={17} />*/}
      {/* include it here */}
      <ContactSection />
    </div>
  );
}

export default Contactus;
