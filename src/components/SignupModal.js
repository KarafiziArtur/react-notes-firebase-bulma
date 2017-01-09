import React, { Component } from 'react';
import './SignupModal.css';
import classNames from 'classnames';

class SignupModal extends Component {

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    const email = this.state.email;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;

    if (password === confirmPassword) {
      const newUser = {
        email,
        password
      };

      this.props.onSubmit(newUser);

      this.setState({
        email: '',
        password: '',
        confirmPassword: ''
      });
    } else {
      alert("Password must match");
    }
  };

  // universal onChange helper for form
  onChange = (field) => {
    this.setState({
      [field.target.name]: field.target.value
    });
  };

  render() {
    return (
      <div className={classNames('SignupModal modal', { 'is-active': this.props.isActive })}>
        <div className="modal-background" onClick={this.props.toggleModalSignup} />
        <div className="modal-content">
          <form onSubmit={this.onSubmit} className="box">
            <p className="control has-icon">
              <input className="input"
                     type="email"
                     name="email"
                     placeholder="Email"
                     value={this.state.email}
                     onChange={this.onChange}
                     required
              />
              <span className="icon is-small">
                <i className="fa fa-envelope" />
              </span>
            </p>
            <p className="control has-icon">
              <input className="input"
                     type="password"
                     name="password"
                     placeholder="Password"
                     value={this.state.password}
                     onChange={this.onChange}
                     required
              />
              <span className="icon is-small">
                <i className="fa fa-lock" />
              </span>
            </p>
            <p className="control has-icon">
              <input className="input"
                     type="password"
                     name="confirmPassword"
                     placeholder="Confirm password"
                     value={this.state.confirmPassword}
                     onChange={this.onChange}
                     required
              />
              <span className="icon is-small">
                <i className="fa fa-lock" />
              </span>
            </p>
            <p className="control">
              <button type="submit" className="button is-primary">Sign up</button>
            </p>
          </form>
        </div>
        <button className="modal-close" onClick={this.props.toggleModalSignup} />
      </div>
    );
  }
}

export default SignupModal;
