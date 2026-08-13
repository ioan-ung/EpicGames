import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import LibraryAccount from "../components/Library";
import Bag from "../svg/bag.svg?react";
import LibraryIcon from "../svg/library.svg?react";
import Store from "../components/Store";

const Homescreen = () => {
  const [type, setType] = useState("store");
  const navigate = useNavigate();
  const data = localStorage.getItem("access");

  useEffect(() => {
    if (data === null) {
      navigate("/signin");
    }
  }, [data,navigate]);

  return (
    <Container
      className="MainPage home-page"
      fluid
      style={{
        padding: 0,
        backgroundImage: "linear-gradient(#13120F, #252525)",
        width: "100vw",
      }}
    >
      <div className="home-nav">
        <div
          id="store-nav-btn"
          className={`home-nav-item ${type === "store" ? "active" : ""}`}
          onClick={() => setType("store")}
        >
          <Bag />
          <span>Store</span>
        </div>
        <div
          className={`home-nav-item ${type === "library" ? "active" : ""}`}
          onClick={() => setType("library")}
        >
          <LibraryIcon />
          <span>Library</span>
        </div>
      </div>

      <Row>
        <Col md={12} style={{ minHeight: "100vh" }}>
          {type === "store" ? <Store /> : <LibraryAccount />}
        </Col>
      </Row>
    </Container>
  );
};

export default Homescreen;
