import React from "react";
import "./container.css";

const Container = ({ header, children }) => {
  return (
    <div className="container">
      {header && <h2 className="item">{header}</h2>}
      <div className="item">{children}</div>
    </div>
  );
};

export default Container;
