import React from "react";
import Auxillary from "../../../hoc/Auxillary";
import Button from "../../UI/Button/Button";
const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Auxillary>
      <h3>Your Order</h3>
      <p>The burger has the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Total Price: <strong>${props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType="Success" clicked={props.buyContinued}>CONTINUE</Button>
      <Button btnType="Danger" clicked={props.buyCanceled}>CANCEL</Button>
    </Auxillary>
  );
};

export default orderSummary;
