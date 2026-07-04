import React from "react";
import { useEffect } from "react";
import { API_URL } from "../index";
import QueryString from "query-string";

function StripePayment({ money, coins, bonus, priceId }) {
  useEffect(() => {
    try {
      const currentUrl = new URL(this.parent.location.href);
      const values = QueryString.parse(currentUrl.search);
      if (values.success) {
        console.log("Order placed! You will receive an email confirmation.");
      }

      if (values.canceled) {
        console.log(
          "Order canceled -- continue to shop around and checkout when you're ready."
        );
      }
    } catch (error) {
      console.log("Error processing query parameters:", error);
    }
  }, []);

  return (
    <section>
      <form
        action={`${API_URL}/api/payments/create-checkout-session`}
        method="POST"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input type="hidden" name="priceId" value={priceId} />
        <button
          type="submit"
          class="btn btn-primary"
          style={{ position: "absolute" }}
        >
          Checkout
        </button>
      </form>
    </section>
  );
}

export default StripePayment;
