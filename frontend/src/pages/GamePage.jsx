import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import VideoCarousel from "../components/VideoCarousel";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Loader from "../components/Loader";
import { getProductById } from "../actions/productActions";
import GameInfoBox from "../components/GameInfoBox";
import GameGallery from "../components/GameGallery";

const GamePopup = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [buyNow, setBuyNow] = useState(false);
  const [wishlist,setWishList] = useState(false);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const getGameById = useSelector((state) => state.gameDetails);
  const { loading, error, game } = getGameById;
  const userDetails = useSelector((state) => state.currentUser.userDetails);
  const [activeImage, setActiveImage] = useState(0);

  const isOwned = userDetails?.bought_games?.includes(game?.id);

  useEffect(() => {
    setActiveImage(0);
  }, [game?.id]);

  useEffect(() => {
    setWishList(
      userDetails?.wished_games?.includes(parseInt(id, 10)) ?? false
    );
  }, [userDetails, id]);

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
          <GameGallery game={game} activeImage={activeImage} setActiveImage={setActiveImage} />

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
            
            <GameInfoBox
              game={game}
              isOwned={isOwned}
              buyNow={buyNow}
              setBuyNow={setBuyNow}
              wishlist={wishlist}
              setWishList={setWishList}
              userDetails={userDetails}
              id={id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePopup;
