import React, { Component } from 'react';
import './Note.css';

import moment from 'moment';

class Note extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      title: this.props.title,
      description: this.props.description
    };
  }

  onEdit = () => {
    this.setState({
      isEdit: true
    });
  };

  onSave = (event) => {
    event.preventDefault();
    this.props.onSave(this.props.id, {
      title: this.state.title,
      description: this.state.description
    });
    this.setState({
      isEdit: false
    });
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onRemove = () => {
    this.props.onRemove(this.props.id);
  };

  render() {
    return (
      <div className="Note card">
        <form onSubmit={ this.onSave.bind(this) }>
          <header className="card-header">
            <p className="card-header-title">
              {
                this.state.isEdit ?
                  <input type="text"
                         name="title"
                         className="input"
                         placeholder="Enter the title"
                         value={ this.state.title }
                         onChange={ this.onChange }
                  />
                  :
                  <span>{ this.state.title } <small> { moment(this.props.created).fromNow() }</small></span>
              }
            </p>
          </header>
          <div className="card-content">
            <div className="content">
              {
                this.state.isEdit ?
                  <textarea name="description"
                            className="textarea"
                            placeholder="Enter the description"
                            value={ this.state.description }
                            onChange={ this.onChange }
                  />
                  :
                  <span>{ this.state.description }</span>
              }
            </div>
            <small>{ moment(this.props.created).format("DD.MM.YYYY") }</small>
          </div>

          <footer className="card-footer">
            {
              this.state.isEdit ?
                <button type="submit" className="button card-footer-item">Save</button>
                :
                <span type="button" className="button card-footer-item" onClick={ this.onEdit }>Edit</span>
            }
            <span className="button card-footer-item is-danger" onClick={ this.onRemove }>Remove</span>
          </footer>
        </form>
      </div>
    );
  }
}

export default Note;
