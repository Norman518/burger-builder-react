import React, { Component } from "react";
import Auxillary from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axiosOrders";
const INGREDIENT_PRICES = {
  lettuce: 0.5,
  cheese: 0.65,
  meat: 1,
  tomato: 0.75
};
class BurgerBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  state = {
    ingredients: {
      lettuce: 0,
      tomato: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 2,
    buyable: false,
    buying: false,
    loading: false
  };

  updateBuyableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ buyable: sum > 0 });
  }

  addIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updateBuyableState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const updatedCount = this.state.ingredients[type] - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updateBuyableState(updatedIngredients);
  };

  buyHandler = () => {
    this.setState({ buying: true });
  };

  buyCancelHandler = () => {
    this.setState({ buying: false });
  };

  buyContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "bob",
        address: {
          street: "af",
          zipcode: "29492",
          country: "USA"
        },
        email: "test@gamail.com"
      },
      deliveryMethod: "Drive-Thru"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false, buying: false });
      })
      .catch(error => {
        this.setState({ loading: false, buying: false });
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        buyCanceled={this.buyCancelHandler}
        buyContinued={this.buyContinueHandler}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Auxillary>
        <Modal show={this.state.buying} modalClosed={this.buyCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          buyable={this.state.buyable}
          ordered={this.buyHandler}
          price={this.state.totalPrice}
        />
      </Auxillary>
    );
  }
}

export default BurgerBuilder;
