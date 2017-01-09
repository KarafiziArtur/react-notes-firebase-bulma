import React, {Component} from 'react';
import './Navigation.css';

class Navigation extends Component {

  /***************************************************
   * Helpers for toggle modal windows ****************
   ***************************************************/

  toggleModalAdd = () => {
    this.props.toggleModalAdd();
  };

  toggleModalLogin = () => {
    this.props.toggleModalLogin();
  };

  toggleModalSignup = () => {
    this.props.toggleModalSignup();
  };

  // Helper for logout
  onLogout = () => {
    this.props.onLogout();
  };

  /***************************************************
   * Render main functionality of navigation bar *****
   ***************************************************/

  renderIfLoggedIn = () => {
    return (
      <span className="nav-item">
        <span className="welcome-message subtitle is-5">Hi, {this.props.userEmail}! </span>
        <span className="button rounded nav-item">
          <i className="fa fa-plus fa-2x" title="Add new Note" onClick={this.toggleModalAdd} />
        </span>
        <span className="nav-item">
          <span className="button is-info" onClick={this.onLogout}>
            <span>Log out</span>
          </span>
        </span>
      </span>
    );
  };

  renderIfGuest = () => {
    return (
      <span className="nav-item">
        <span className="button is-success" onClick={this.toggleModalLogin}>
          <span>Log in</span>
        </span>
        <span className="button is-info" onClick={this.toggleModalSignup}>
          <span>Sign up</span>
        </span>
      </span>
    );
  };

  render() {
    return (
      <div className="Navigation">
        <nav className="nav">
          <div className="container">
            <div className="nav-left">
              <a className="nav-item is-brand" href="/">
                Notes
              </a>
            </div>

            <div className="nav-right nav-menu">
              {
                this.props.isLoggedIn ?
                  this.renderIfLoggedIn()
                  :
                  this.renderIfGuest()
              }
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;
