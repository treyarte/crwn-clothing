import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
    const priceForStrip = price * 100;
    const publishableKey ="pk_test_qJ5zU4hR8hDzZVFl6EGs8Qcy00ObPHoHBG";

    const onToken = token => {
        console.log(token);
        alert("Payment Successful");
    }

    return (
        <StripeCheckout
            label="Pay Now"
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://sendeyo.com/up/d/f3eb2117da"
            description={`Your total is $${price}`}
            amount={priceForStrip}
            panelLabel = "Pay Now"
            token={onToken}
            stripeKey= {publishableKey}
        />
    )
}

export default StripeCheckoutButton;