import React, { Component } from "react";
import { Form } from "./Form";

export default class FormPropsTextFields extends Component {
  constructor() {
    super();
    this.state = {
      gallons: 0,
      date: null,
      address: " ",
      suggestedPrice: 0,
      amountDue: 0,
    };
  }

  handleChange1 = (e) => {
    this.setState(
      {
        gallons: e.target.value,
      },
      () => {
        console.log(this.state.gallons);
      }
    );
  };
  handleChange2 = (e) => {
    this.setState(
      {
        date: e.target.value,
      },
      () => {
        console.log(this.state.date);
      }
    );
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:9000/fuel-quote-form", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gallons: this.state.gallons,
        date: this.state.date,
      }),
    });
    const response = await res.text();
    const body = JSON.parse(response);
    const { address, suggestedPrice, amountDue } = body;
    this.setState(
      {
        address: address,
        suggestedPrice: suggestedPrice,
        amountDue: amountDue,
      },
      () => {
        this.setState(this.state);
      }
    );
  };

  render() {
    return (
      <div>
        <Form
          handleChange1={this.handleChange1}
          handleChange2={this.handleChange2}
          handleSubmit={this.handleSubmit}
          address={this.state.address}
          suggestedPrice={this.state.suggestedPrice}
          amountDue={this.state.amountDue}
        />
      </div>
    );
  }
}
