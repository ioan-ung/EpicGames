import React from "react";
import { ReactComponent as Eroare } from "../svg/error.svg";
import { useState } from "react";
import { ReactComponent as Close } from "../svg/close.svg";
const Error = () => {
  const [open, setOpen] = useState(true);

  return (
    open && (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "300px",
          backgroundColor: "red",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Eroare style={{ height: "1.5rem", width: "auto" }} />
        <h3>Error</h3>
        <Eroare style={{ height: "1.5rem", width: "auto" }} />

        <Close
          onClick={() => setOpen(false)}
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            height: "2rem",
            width: "auto",
            cursor: "pointer",
          }}
        />
      </div>
    )
  );
};

export default Error;
