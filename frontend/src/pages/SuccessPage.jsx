import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserAction } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

function SuccessPage() {
  const navigate = useNavigate();
  const userCredentials = useSelector((state) => state.currentUser);
  const { loading, error, userDetails } = userCredentials;
  const finalCoins = JSON.parse(localStorage?.getItem("finalCoins"));
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(
      "datele mele",
      userDetails?.id,
      finalCoins + userDetails?.coins
    );

    if (finalCoins && userDetails) {
      const data = {
        coins: finalCoins + userDetails?.coins,
      };
      dispatch(updateUserAction({ user: userDetails?.id, data: data }));
      navigate("/");
      window.location.reload();
    }
  }, [dispatch, finalCoins, userDetails]);

  return (
    <div>
      <header>
        <h1>Welcome to My SuccessPage</h1>
      </header>
      <main>
        <p>This is a default JSX template.</p>
        <p>You can start building your application from here!</p>
      </main>
      <footer>
        <p>Footer content goes here.</p>
      </footer>
    </div>
  );
}

export default SuccessPage;
