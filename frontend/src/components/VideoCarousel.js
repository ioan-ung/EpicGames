import React from "react";
import { Carousel, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const VideoCarousel = ({ video }) => {
  const baseUrl = "http://localhost:8000";
  const videoUrl = `${baseUrl}${video}`;

  return (
    <Carousel
      style={{ justifyContent: "space-evenly", position: "relative" }}
      pause="hover"
      className=""
    >
      <Carousel.Item>
        <Container
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
          fluid
        >
          <Link to={"#"}>
            <video style={{ width: "20rem", height: "10rem" }} controls>
              <source src={videoUrl} type="video/mp4" />
            </video>
          </Link>
          <Link to={"#"}>
            <video style={{ width: "20rem", height: "10rem" }} controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Link>
        </Container>
      </Carousel.Item>
      <Carousel.Item>
        <Container
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
          fluid
        >
          <Link to={"#"}>
            <video style={{ width: "20rem", height: "10rem" }} controls>
              <source src={videoUrl} type="video/mp4" />
            </video>
          </Link>
          <Link to={"#"}>
            <video style={{ width: "20rem", height: "10rem" }} controls>
              <source src={videoUrl} type="video/mp4" />
            </video>
          </Link>
        </Container>
      </Carousel.Item>
    </Carousel>
  );
};

export default VideoCarousel;
