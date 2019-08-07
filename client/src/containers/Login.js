import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Redirect } from "react-router";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
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
  };

  render() {
    return (
      <div className="Login">
        <h1 style={text}>Log In to Docs!</h1>
        <form
          onSubmit={this.handleSubmit}
          style={form}
          style={{
            marginLeft: 500
          }}
        >
          <FormGroup controlId="username" bsSize="large">
            <FormLabel>Username</FormLabel>
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
            <FormLabel>Password</FormLabel>
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
            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              style={{ borderRadius: 6, backgroundColor: "white" }}
            >
              Login
            </Button>
            <Button
              block
              bsSize="large"
              type="submit"
              style={{ borderRadius: 6, backgroundColor: "white" }}
              onClick={() => <Redirect to="/register" />}
            >
              Go to Register
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
