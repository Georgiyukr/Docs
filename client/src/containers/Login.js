import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { Redirect } from "react-router";
import "./Login.css";
import { NavLink } from 'react-router-dom'
import { withRouter } from "react-router-dom";


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loginSuccess: false,
      loginFail: false
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    event.preventDefault();
    // console.log('handle change function');
    this.setState({
      [event.target.id]: event.target.value
    });
    // console.log(this.state.username);
  };

  handleOnSubmit = () => {

    this.props.history.push(`/register`);
  };

  handleSubmit = event => {
    event.preventDefault();

    fetch("http://localhost:4000/db/login", {
      method: "POST",
      credentials: "include",
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => res.json()).then(res => {
      console.log('ye');
      this.setState({
        loginSuccess: true
      })
      console.log(res);
    }).catch(err => {
      console.log('caught');
      this.setState({
        loginFail: true
      })
      console.log(err);

    })

  };

  render() {
    if (this.state.loginSuccess) {
      return <Redirect to='/portalPage' />
    }

    if (this.state.loginFail) {
      return <Redirect to="/" />
    }



    return (
      <div className="Login">
        {this.state.loginSuccess ? <h1 style={text}>Log In to Docs!</h1> : <Redirect to="/editorPage" />}
        {this.state.loginFail ? <h1 style={text}>Log In Fail!</h1> : <Redirect to="/" />}


        <form
          onSubmit={this.handleSubmit}
          style={form}
          style={{
            marginLeft: 300
          }}
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
            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              style={{
                borderRadius: 6,
                backgroundColor: "white"
              }}
              onClick={e => {
                console.log(this.state);
                this.handleSubmit(e);
              }}
            >
              Login
            </Button>

            <Button
              block
              bsSize="large"
              type="submit"
              style={{ borderRadius: 6, backgroundColor: "white" }}
              onClick={this.handleOnSubmit}
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
  justifyContent: "center",

};

const form = {
  width: 100,
  height: 200
};
const button = {
  padding: 9
};
