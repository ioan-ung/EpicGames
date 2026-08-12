import React from "react";
import { Carousel, Container } from "react-bootstrap";

const baseUrl = "http://localhost:8000";

const resolveVideoUrl = (video) =>
  video.startsWith("http://") || video.startsWith("https://")
    ? video
    : `${baseUrl}${video}`;

const VIDEOS_PER_SLIDE = 2;

const chunk = (array, size) =>
  array.reduce((chunks, item, index) => {
    if (index % size === 0) chunks.push([]);
    chunks[chunks.length - 1].push(item);
    return chunks;
  }, []);

const VideoCarousel = ({ videos }) => {
  const videoList = videos?.length ? videos : [];

  if (videoList.length === 0) return null;

  const slides = chunk(videoList, VIDEOS_PER_SLIDE);

  return (
    <Carousel
      style={{ justifyContent: "space-evenly", position: "relative" }}
      pause="hover"
      className=""
    >
      {slides.map((slide, slideIndex) => (
        <Carousel.Item key={slideIndex}>
          <Container
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
            fluid
          >
            {slide.map((video) => (
              <video
                key={video.id}
                style={{ width: "20rem", height: "10rem" }}
                controls
              >
                <source src={resolveVideoUrl(video.video)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))}
          </Container>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default VideoCarousel;
