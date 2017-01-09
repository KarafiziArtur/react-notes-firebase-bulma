import React, { Component } from 'react';
import './LoginModal.css';
import classNames from 'classnames';

class LoginModal extends Component {

  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.onSubmit(user);

    this.setState({
      email: '',
      password: ''
    });
  };

  // universal onChange helper for form
  onChange = (field) => {
    this.setState({
      [field.target.name]: field.target.value
    });
  };

  render() {
    return (
      <div className={classNames('LoginModal modal', { 'is-active': this.props.isActive })}>
        <div className="modal-background" onClick={this.props.toggleModalLogin} />
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
            <p className="control">
              <button type="submit" className="button is-success">Log in</button>
            </p>
          </form>
        </div>
        <button className="modal-close" onClick={this.props.toggleModalLogin} />
      </div>
    );
  }
}

export default LoginModal;
