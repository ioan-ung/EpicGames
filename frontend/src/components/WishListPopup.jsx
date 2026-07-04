import React from "react";
import { Modal, Button, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import WishRow from "./WishRow";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const WishListPopup = ({ wishList, setWishList }) => {
  const handleClose = () => {
    setWishList(false);
  };
  const user = useContext(AuthContext)
  const getProducts = useSelector((state) => state.getSearchedProductsReducer);
  const { loading, error, games } = getProducts;
  const data = JSON.parse(localStorage.getItem(`userWishList_${user?.user?.user_id}`) || "[]");
  const productList = games?.products;

  return (
    <div style={{ overflowY: "scroll" }}>
      <Modal
        show={wishList}
        onHide={handleClose}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: "linear-gradient(#13120F, #252525)",
        }}
        >
        
        <Modal.Body>
          {data&&
            productList &&
            data.map((id, index) => {
              const gameId = parseInt(id, 10);
              const game = Object.values(productList).find(
                (g) => g?.id === gameId
              );
              if (game) {
                return (
                  <WishRow key={index} game={game} setWishList={setWishList} />
                );
              } else {
                return null;
              }
            })}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WishListPopup;
