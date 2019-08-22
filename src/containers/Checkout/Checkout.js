import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
class Checkout extends Component {
  //dummy data
  state = {
    ingredients: {
      lettuce: 1,
      meat: 1,
      cheese: 1,
      tomato: 1
    }
  };
  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutContinue={this.checkoutContinueHandler}
          checkoutCancel={this.checkoutCancelHandler}
        />
      </div>
    );
  }
}

export default Checkout;
