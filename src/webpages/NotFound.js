import React from "react";
import { Link } from "react-router-dom";
import "./css/Feeds.css";

export default function NotFound() {
  return (
    <div className="Feeds-container">
      <div className="Feeds-box">
        <div className="blue-background">
          <div className="your-feeds">404 NOT FOUND</div>
          <div className="your-feeds">
            <Link to="/">Return</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
