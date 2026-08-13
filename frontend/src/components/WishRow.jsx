import React from "react";
import Cart from "../svg/cart.svg?react";
import Garbage from "../svg/garbage.svg?react";
import Pricing from "../svg/price.svg?react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteFromWishList } from "../actions/productActions";

function WishRow({ game, userId, setWishList, onRemove }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteFromWishList(game?.id, userId));
    onRemove?.(game?.id);
  };

  const goToGame = () => {
    navigate(`/gamePage/${game?.id}`);
    setWishList(false);
  };

  return (
    <div className="wishlist-row" onClick={goToGame}>
      <div className="wishlist-row-image-wrap">
        <img
          className="wishlist-row-image"
          src={game?.images?.[0]?.image}
          alt={game?.name || "Game cover"}
        />
      </div>

      <div className="wishlist-row-info">
        <span className="wishlist-row-tag">Wishlist</span>
        <h3 className="wishlist-row-title">{game?.name}</h3>
        <div className="wishlist-row-price">
          <Pricing />
          {game?.price}
        </div>
      </div>

      <div className="wishlist-row-actions">
        <button
          type="button"
          className="wishlist-icon-btn wishlist-icon-btn-cart"
          onClick={(e) => {
            e.stopPropagation();
            goToGame();
          }}
          aria-label="View game"
        >
          <Cart />
        </button>
        <button
          type="button"
          className="wishlist-icon-btn wishlist-icon-btn-delete"
          onClick={handleDelete}
          aria-label="Remove from wishlist"
        >
          <Garbage />
        </button>
      </div>
    </div>
  );
}

export default WishRow;
