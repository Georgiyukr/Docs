import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Register.css";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      registerSuccess: false,
      registerFail: false
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    fetch("http://localhost:4000/db/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.props.history.push(`/`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div style={{ display: "grid", justifyContent: "center" }}>
        <h1 style={text}>Registration Page</h1>
        <form
          onSubmit={this.handleSubmit}
          style={form}
          
        >
          <FormGroup controlId="username" bsSize="large">
            <label>Username</label>
            <FormControl
              autoFocus
              type="string"
              value={this.state.username}
              onChange={this.handleChange}
              placeholder="Type in your username"
              style={{
                width: 200,
                height: 25,
                borderRadius: 5,
                margin: 3
              }}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <label>Password</label>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              placeholder="Type in your password"
              style={{
                width: 200,
                height: 25,
                borderRadius: 5,
                margin: 3
              }}
            />
          </FormGroup>
          <div style={button}>
            {/* <Button 
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            style={{ borderRadius: 6,
              backgroundColor:"white"
            }}
          >
            Login
          </Button> */}
            <Button
              block
              bsSize="large"
              type="submit"
              style={{
                borderRadius: 6,
                backgroundColor: "white"
              }}
              onClick={e => {
                this.handleSubmit(e);
              }}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
const text = {
  display: "flex",
  justifyContent: "center"
};

const form = {
  width: 100,
  height: 200
};
const button = {
  padding: 9
};
