import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";
const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Enjoy the burger!</h1>
      <div className={classes.Outline} />
      <Burger ingredients={props.ingredients} />
      <Button btnType="Success" clicked>
        Continue
      </Button>
      <Button btnType="Danger" clicked>
        Cancel
      </Button>
    </div>
  );
};

export default checkoutSummary;
