import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-logo">CoinOrbit</h2>
        <p className="footer-text">
          © {new Date().getFullYear()} CoinOrbit. All rights reserved.
        </p>

       
      </div>
    </footer>
  );
}

export default Footer;
