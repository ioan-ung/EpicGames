import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import LibraryAccount from "../components/LibraryAccount";
import { ReactComponent as Bag } from "../svg/bag.svg";
import { ReactComponent as Library } from "../svg/library.svg";
import Store2 from "../components/Store2";

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
      className="MainPage"
      fluid
      style={{
        padding: 0,
        backgroundImage: "linear-gradient(#13120F, #252525)",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Row>
        <Col
          style={{ height: "100vh", width: "15%" }}
          className="d-flex align-items-center justify-content-center"
          md={2}
        >
          <Container style={{ marginBottom: "8em" }}>
            <Row style={{ height: "5rem" }} md={4}>
              <Col
                style={{ height: "1.5em", color: "white", left: "1em" }}
                className="HeaderSvg"
              >
                <Bag
                  onClick={(e) => {
                    e.stopPropagation();
                    setType("store");
                  }}
                  style={{ cursor: "pointer" }}
                />
              </Col>
              <Col>
                <div
                  onClick={() => setType("store")}
                  style={{ color: "white", cursor: "pointer" }}
                >
                  <h5>Store</h5>
                </div>
              </Col>
            </Row>

            <Row style={{ height: "5rem" }} md={4}>
              <Col
                style={{ height: "1.5em", color: "white", left: "1em" }}
                className="HeaderSvg"
              >
                <Library
                  onClick={() => setType("library")}
                  style={{ cursor: "pointer" }}
                />
              </Col>
              <Col>
                <div
                  onClick={() => setType("library")}
                  style={{ color: "white", cursor: "pointer" }}
                >
                  <h5>Library</h5>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col
          md={10}
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {type === "store" ? <Store2 /> : <LibraryAccount />}
        </Col>
      </Row>
    </Container>
  );
};

export default Homescreen;
