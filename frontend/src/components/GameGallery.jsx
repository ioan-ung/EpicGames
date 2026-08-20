import React from "react";
import Star from "../svg/star.svg?react";
import Company from "../svg/company.svg?react";
import Download from "../svg/downloads.svg?react";

const GameGallery = ({ game, activeImage, setActiveImage }) => {
  return (
    <>
      <div className="game-hero">
        <img
          className="game-hero-bg"
          src={game?.images?.[activeImage]?.image}
          alt=""
          aria-hidden="true"
        />
        <img
          className="game-hero-image"
          src={game?.images?.[activeImage]?.image}
          alt={game?.name || "Game cover"}
        />
        <div className="game-hero-overlay" />
        <div className="game-hero-content">
          <h1>{game?.name}</h1>
          <div className="game-hero-meta">
            {game?.rating && (
              <span>
                <Star />
                {game.rating}
              </span>
            )}
            {game?.company && (
              <span>
                <Company />
                {game.company}
              </span>
            )}
            {game?.downloads !== undefined && (
              <span>
                <Download />
                {game.downloads}M downloads
              </span>
            )}
          </div>
        </div>
      </div>

      {game?.images?.length > 1 && (
        <div className="game-gallery-thumbs">
          {game.images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              className={`game-gallery-thumb ${activeImage === index ? "active" : ""}`}
              onClick={() => setActiveImage(index)}
            >
              <img src={image.image} alt={`${game.name} screenshot ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default GameGallery;
