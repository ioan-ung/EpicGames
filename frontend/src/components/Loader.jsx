import React from "react";
import { Spinner } from "react-bootstrap";
const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        height: "100px",
        width: "100px",
      }}
    ></Spinner>
  );
};

export default Loader;
