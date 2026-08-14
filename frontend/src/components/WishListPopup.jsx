import React, { useContext, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WishRow from "./WishRow";
import WishListIcon from "../svg/price.svg?react";
import CloseIcon from "../svg/close.svg?react";
import { AuthContext } from "../context/AuthContext";

const WishListPopup = ({ wishList, setWishList }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userId = user?.user_id;

  const userCredentials = useSelector((state) => state.getUserReducer);
  const { userDetails } = userCredentials;

  const [wishIds, setWishIds] = useState(userDetails?.wished_games ?? []);

  const handleClose = () => setWishList(false);

  const getProducts = useSelector((state) => state.getSearchedProductsReducer);
  const { games, products } = getProducts;
  const productList = products ?? games?.products ?? games ?? [];

  const wishListGames = useMemo(
    () =>
      wishIds
        .map((id) =>
          Object.values(productList).find((g) => g?.id === parseInt(id, 10))
        )
        .filter(Boolean),
    [wishIds, productList]
  );

  const handleRemove = (gameId) => {
    setWishIds((prev) => prev.filter((id) => parseInt(id, 10) !== gameId));
  };

  return (
    <Modal
      show={wishList}
      onHide={handleClose}
      centered
      scrollable
      dialogClassName="wishlist-modal-dialog"
      contentClassName="wishlist-modal-content"
      onShow={() => setWishIds(userDetails?.wished_games ?? [])}
    >
      <div className="wishlist-header">
        <div className="wishlist-title">
          <WishListIcon className="wishlist-title-icon" />
          <span>My Wishlist</span>
          {wishListGames.length > 0 && (
            <span className="wishlist-count">{wishListGames.length}</span>
          )}
        </div>
        <button
          type="button"
          className="wishlist-close-btn"
          onClick={handleClose}
          aria-label="Close wishlist"
        >
          <CloseIcon />
        </button>
      </div>

      <Modal.Body className="wishlist-body">
        {wishListGames.length > 0 ? (
          wishListGames.map((game) => (
            <WishRow
              key={game.id}
              game={game}
              userId={userId}
              setWishList={setWishList}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <div className="wishlist-empty">
            <WishListIcon className="wishlist-empty-icon" />
            <p className="wishlist-empty-title">Your wishlist is empty</p>
            <span className="wishlist-empty-subtitle">
              Save the games you love and find them here later.
            </span>
            <button
              type="button"
              className="wishlist-browse-btn"
              onClick={() => {
                handleClose();
                navigate("/listGame/");
              }}
            >
              Browse Store
            </button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default WishListPopup;
