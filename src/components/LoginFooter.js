import React from "react";
import { Link } from "react-router-dom";

export const LoginFooter = (props) => {
  return (
    <>
      <div className="dont-have-an-acc">
        {props.text}
        <Link to={props.toPath}>{props.toText}</Link>
      </div>
    </>
  );
};
