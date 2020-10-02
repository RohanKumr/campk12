import React from "react";
import { Link } from "react-router-dom";
import "../Feeds/Feeds.css";

function NotFound() {
  return (
    <div className="Feeds-container">
      <div className="Feeds-box">
        <div className="blue-background">
          <div className="your-feeds">404 NOT FOUND</div>
          <div className="your-feeds">
            Go To<span></span>
            <Link to="/campk12"> Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
