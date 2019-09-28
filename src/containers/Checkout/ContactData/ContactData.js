import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axiosOrders";
import Input from "../../../components/UI/Input/Input";
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'ZIP Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'input',
        elementConfig: {
          options: [{
            value: 'fastest',
            displayValue: 'Fastest'
          }, {
            value: 'cheapest',
            displayValue: 'Cheapest'
          }]
        },
        value: ''
      }
    },
    loading: false
  };
  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
     
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };
  render() {
    let form = (
      <form>
        <Input elementType="..." elementConfig="..." value = "..." />
        <Input inputType="input" type="email" name="email" placeholder="Your Email" />
        <Input inputType="input" type="text" name="street" placeholder="Street" />
        <Input inputType="input" type="number" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
