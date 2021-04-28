import React, { Component } from "react";
import { Form } from "./Form";
import axios from "axios";
import { getConfig } from "../authConfig";
import { ThreeDRotationSharp } from "@material-ui/icons";

export default class FormPropsTextFields extends Component {
  constructor() {
    super();
    this.state = {
      gallons: 0,
      date: null,
      address: " ",
      suggestedPrice: 0,
      amountDue: 0,
      errors: {
        gallons: "",
        date: "",
      },
    };
  }

  getAddress = async () => {
    const response = await axios.get(
      "http://localhost:9000/profile",
      getConfig()
    );
    const { data } = response;
    let address = "";
    if (data.addressTwo) {
      address = `${data.address_one}, ${data.address_two}, ${data.city}, ${data.state}`;
    } else {
      address = `${data.address_one}, ${data.city}, ${data.state}`;
    }
    this.setState({
      address: address,
    });
  };

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
    let passed = true;
    let error_state = {
      gallons: "",
      date: "",
    };
    if (!this.state.gallons) {
      error_state.gallons = "Required";
      passed = false;
    }
    if (!this.state.date) {
      error_state.date = "Required";
      passed = false;
    }
    this.setState({
      ...this.state,
      errors: error_state,
    });
    if (passed) {
      e.preventDefault();
      const res = await fetch("http://localhost:9000/fuel_quote", {
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
      console.log(response);
      const res_json = JSON.parse(response);
      console.log(res_json);
      const { suggested_price, total_amount } = res_json;
      let address = "";
      if (res_json.addressTwo) {
        address = `${res_json.address_one}, ${res_json.address_two}, ${res_json.city}, ${res_json.state}`;
      } else {
        address = `${res_json.address_one}, ${res_json.city}, ${res_json.state}`;
      }
      this.setState(
        {
          address: address,
          suggestedPrice: suggested_price,
          amountDue: total_amount,
        },
        () => {
          this.setState(this.state);
        }
      );
    }
  };

  componentDidMount = () => {
    this.getAddress();
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
          errors={this.state.errors}
        />
      </div>
    );
  }
}
