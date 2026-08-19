import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToWishList, deleteFromWishList } from "../actions/productActions";
import BuyGame from "./BuyGame";
import Money from "../svg/money.svg?react";
import Company from "../svg/company.svg?react";
import Download from "../svg/downloads.svg?react";
import Memory from "../svg/memory.svg?react";
import Baby from "../svg/baby.svg?react";
import Pricing from "../svg/price.svg?react";

const GameInfoBox = ({ game, isOwned, buyNow, setBuyNow, wishlist, setWishList, userDetails, id }) => {
    const dispatch = useDispatch();

    return (
    <aside className="game-buy-box">
            {isOwned ? (
            <Button className="feature-primary-btn game-download-btn">
                <Download style={{ width: "1.1rem", height: "1.1rem" }} />
                <strong>Download</strong>
            </Button>
            ) : (
            <>
                <div className="game-buy-price">
                <Money />
                {game?.price}
                </div>

                <Button
                className="feature-primary-btn game-buy-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    setBuyNow(true);
                }}>
                <strong>Buy now</strong>
                </Button>

                {
                !wishlist?
                <Button
                    className="feature-secondary-btn game-wishlist-btn"
                    onClick={() => {
                    dispatch(addToWishList(id, userDetails.id));
                    setWishList(true);
                    }}
                >
                    <Pricing style={{ width: "1.1rem", height: "1.1rem" }} />
                    Add to wishlist
                </Button>
                    :
                <Button
                    id="wishlist-added-btn"
                    className="feature-secondary-btn game-wishlist-btn"
                    onClick={() => {
                    dispatch(deleteFromWishList(id, userDetails.id));
                    setWishList(false);
                    }}
                >
                    <Pricing style={{ width: "1.1rem", height: "1.1rem" }} />
                    Added to wishlist
                </Button>
                }
            </>
            )}

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
    );
};

export default GameInfoBox;