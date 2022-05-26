import React from "react";
import { Icon, InlineIcon } from "@iconify/react";

import locationIcon from "@iconify/icons-mdi/map-marker-radius-outline";
import phoneIcon from "@iconify/icons-mdi/phone-outline";
import emailIcon from "@iconify/icons-mdi/email-multiple-outline";

import facebookIcon from "@iconify/icons-mdi/facebook";
import linkedinIcon from "@iconify/icons-mdi/linkedin";

import "./info.css";

const contactDetails = [
  {
    value:
      "Rue Yasser Arafet Immeuble Bou Hajeb, 4eme Etage 4054 Sousse Jaouhara, TN",
    icon: locationIcon,
  },
  { value: "+216 73 821 168", icon: phoneIcon },
  { value: "contact@genext-it.com", icon: emailIcon },
];

const renderContactDetails = () =>
  contactDetails.map((detail) => (
    <p key={detail.value} className="info-detail">
      <InlineIcon icon={detail.icon} /> {detail.value}
    </p>
  ));

const renderIcons = () =>
  [facebookIcon, linkedinIcon].map((icon, key) => (
    <Icon icon={icon} key={key} className="info-icon" />
  ));

const Info = () => (
  <section className="info">
    <h2 className="info-h2">Contact</h2>

    <div className="info-details-container">{renderContactDetails()}</div>

    <div className="info-icons-container">{renderIcons()}</div>
  </section>
);

export default Info;
