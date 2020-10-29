import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class MasterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      email: "",
      username: "",
      password: ""
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, username, password } = this.state;
    alert(`Your registration detail: \n 
           Email: ${email} \n 
           Username: ${username} \n
           Password: ${password}`);
  };

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  };

  render() {
    return (
      <div className="container">
        <h1>React Wizard Form</h1>
        <p>Step {this.state.currentStep} </p>
        <div className="line" />
        <Step1
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          email={this.state.email}
          nextStep={this._next}
        />
        <Step2
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          username={this.state.username}
          nextStep={this._next}
          prevStep={this._prev}
        />
        <Step3
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          password={this.state.password}
          prevStep={this._prev}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errors: {
        email: ""
      }
    };
  }

  validateForm = () => {
    if (this.state.email === "") {
      this.setState({
        errors: {
          ...this.state.email,
          email: "Email required"
        }
      });
    } else {
      this.setState({
        errors: {
          ...this.state.email,
          email: ""
        }
      });
      this.props.nextStep();
    }
  };

  change = (e) => {
    this.setState({
      email: e.target.value
    });
  };

  render() {
    const { currentStep } = this.props;

    if (currentStep !== 1) {
      return null;
    }
    return (
      <div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            className={
              this.state.errors.email
                ? "errorBorder form-control"
                : "form-control"
            }
            id="email"
            name="email"
            type="text"
            placeholder="Enter email"
            value={this.state.email}
            onChange={(e) => {
              this.change(e);
              this.props.handleChange(e);
            }}
          />
          {this.state.errors.email && <small>{this.state.errors.email}</small>}
        </div>
        <button
          // disabled={!this.state.email ? true : false}
          onClick={this.validateForm}
        >
          next
        </button>
      </div>
    );
  }
}

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      errors: {
        username: ""
      }
    };
  }

  validateForm = () => {
    if (this.state.username === "") {
      this.setState({
        errors: {
          ...this.state.username,
          username: "username required"
        }
      });
    } else {
      this.setState({
        errors: {
          ...this.state.username,
          username: ""
        }
      });
      this.props.nextStep();
    }
  };

  change = (e) => {
    this.setState({
      username: e.target.value
    });
  };

  render() {
    const { currentStep } = this.props;

    if (currentStep !== 2) {
      return null;
    }
    return (
      <div>
        <div className="form-group">
          <label htmlFor="username">Enter usernamee</label>
          <input
            className={
              this.state.errors.username
                ? "errorBorder form-control"
                : "form-control"
            }
            id="username"
            name="username"
            type="text"
            placeholder="Enter username"
            value={this.state.username}
            onChange={(e) => {
              this.change(e);
              this.props.handleChange(e);
            }}
          />
          {this.state.errors.username && (
            <small>{this.state.errors.username}</small>
          )}
        </div>
        <button onClick={this.props.prevStep}>prev</button>
        <button onClick={this.validateForm}>next</button>
      </div>
    );
  }
}

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      errors: {
        password: ""
      }
    };
  }

  validateForm = (e) => {
    if (this.state.password === "") {
      this.setState({
        errors: {
          ...this.state.password,
          password: "password required"
        }
      });
    } else {
      this.setState({
        errors: {
          ...this.state.password,
          password: ""
        }
      });
      this.props.handleSubmit(e);
    }
  };

  change = (e) => {
    this.setState({
      password: e.target.value
    });
  };

  render() {
    const { currentStep } = this.props;

    if (currentStep !== 3) {
      return null;
    }
    return (
      <div>
        <div className="form-group">
          <label htmlFor="password">Enter password</label>
          <input
            className={
              this.state.errors.password
                ? "errorBorder form-control"
                : "form-control"
            }
            id="password"
            name="password"
            type="text"
            placeholder="Enter password"
            value={this.state.password}
            onChange={(e) => {
              this.change(e);
              this.props.handleChange(e);
            }}
          />
          {this.state.errors.password && (
            <small>{this.state.errors.password}</small>
          )}
        </div>
        <button onClick={this.props.prevStep}>prev</button>
        <button
          onClick={(e) => {
            this.validateForm(e);
          }}
        >
          next
        </button>
      </div>
    );
  }
}

ReactDOM.render(<MasterForm />, document.getElementById("root"));
