import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Pricing from "../svg/price.svg?react";
import VideoCarousel from "../components/VideoCarousel";
import { addToWishList } from "../actions/productActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Loader from "../components/Loader";
import { getProductById } from "../actions/productActions";
import BuyGame from "../components/BuyGame";
import Money from "../svg/money.svg?react";
import Company from "../svg/company.svg?react";
import Download from "../svg/downloads.svg?react";
import Memory from "../svg/memory.svg?react";
import Baby from "../svg/baby.svg?react";
import Star from "../svg/star.svg?react";

const GamePopup = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [buyNow, setBuyNow] = useState(false);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const getGameById = useSelector((state) => state.getProductByIdReducer);
  const { loading, error, game } = getGameById;
  const userCredentials = useSelector((state) => state.getUserReducer);
  const { userDetails } = userCredentials;
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [game?.id]);

  return (
    <div className="MainPage game-page">
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger" className="game-error">
          Couldn't load this game. Please try again later.
        </Alert>
      ) : (
        <div className="game-page-inner">
          <div className="game-hero">
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

          <div className="game-page-body">
            <div className="game-page-main">
              <section className="game-section">
                <h2>About</h2>
                <p>{game?.description}</p>
              </section>

              {game?.videos?.length > 0 && (
                <section className="game-section">
                  <h2>Trailers &amp; Gameplay</h2>
                  <VideoCarousel videos={game.videos} />
                </section>
              )}

              <section className="game-section game-tags-section">
                <div className="game-tags-col">
                  <h3>Genres</h3>
                  <div className="game-tag-pills">
                    {game?.gameTags?.map((tag) => (
                      <span className="game-pill" key={tag?.id}>
                        {tag?.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="game-tags-col">
                  <h3>Features</h3>
                  <div className="game-tag-pills">
                    <span className="game-pill">
                      {game?.multiplayer === true ? "Multiplayer" : "Single-player"}
                    </span>
                  </div>
                </div>
              </section>
            </div>

            <aside className="game-buy-box">
              <div className="game-buy-price">
                <Money />
                {game?.price}
              </div>

              <Button
                className="feature-primary-btn game-buy-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setBuyNow(true);
                }}
              >
                <strong>BUY NOW</strong>
              </Button>

              <Button
                className="feature-secondary-btn game-wishlist-btn"
                onClick={() => {
                  dispatch(addToWishList(id, userDetails.id));
                }}
              >
                <Pricing style={{ width: "1.1rem", height: "1.1rem" }} />
                Add to wishlist
              </Button>

              <BuyGame
                price={game?.price}
                id={game?.id}
                buyNow={buyNow}
                setBuyNow={setBuyNow}
              />

              <ul className="game-specs">
                <li>
                  <Company />
                  <span>Company</span>
                  <strong>{game?.company}</strong>
                </li>
                <li>
                  <Download />
                  <span>Downloads</span>
                  <strong>{game?.downloads} M</strong>
                </li>
                <li>
                  <Memory />
                  <span>Memory</span>
                  <strong>{game?.memory} GB</strong>
                </li>
                <li>
                  <Baby />
                  <span>Age rating</span>
                  <strong>{game?.age}</strong>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePopup;
