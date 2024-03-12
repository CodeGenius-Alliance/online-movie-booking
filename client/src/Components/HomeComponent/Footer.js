import React from "react";
import "./Footer.css";

const obj = [
  {
    heading: "MOVIES BY GENRE",
    content:
      "Drama Movies | Thriller Movies | Action Movies | Comedey Movies | Adventure Movies | Political Movies | Noir Movies | Adaption Movies",
  },
  {
    heading: "MOVIES BY LANGUAGE",
    content:
      "Movies in English | Movies in Hindi | Movies in Japanese | Movies in Tulu | Movies in Khasi | Movies in Nepali",
  },
  {
    heading: "SPORTS EVENTS",
    content:
      "Cricket | Football | Running | Archery | Athletics | Badminton | Basketball | Baseaball | Boat Racing | Bowling",
  },
  {
    heading: "EVENTS IN TOP CITIES",
    content:
      "Events in Mumbai | Events in Dehradun | Events in Chennai | Events in Ludhiana",
  },
  {
    heading: "HELP",
    content: "About us | Contact us | Current Opening | Press Release",
  },
];

function Footer() {
  return (
    <div className="footer-container">
      <div className="content">
        {obj.map((it) => {
          return (
            <>
              <h5>{it.heading}</h5>
              <p className="content-para">{it.content}</p>
            </>
          );
        })}
      </div>
      <div>
        <h2 className="logo-footer">TicketBlitz</h2>
        <hr></hr>
      </div>
      <p className="copyright">
        Copyright 2024 @ TicketBlitz Pvt. Ltd. All Rights Reserved.
      </p>
    </div>
  );
}

export default Footer;
