import React, { Component } from 'react';
import './AddNoteModal.css';
import classNames from 'classnames';

class AddNoteModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { title, description } = this.state;
    this.props.onSubmit(title, description);
    this.setState({
      title: '',
      description: ''
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
      <div className={classNames("AddNoteModal modal", { 'is-active': this.props.isActive })}>
        <form onSubmit={this.onSubmit}>
          <div className="modal-background" onClick={this.props.toggleModalAdd} />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Add new Note</p>
              <i className="delete" onClick={this.props.toggleModalAdd} />
            </header>
            <section className="modal-card-body">
              <p className="control">
                <input type="text"
                       name="title"
                       className="input"
                       placeholder="Enter the title"
                       value={ this.state.title }
                       onChange={ this.onChange }
                />
              </p>
              <p className="control">
                <textarea name="description"
                          className="textarea"
                          placeholder="Enter the description"
                          value={ this.state.description }
                          onChange={ this.onChange }
                />
              </p>
            </section>
            <footer className="modal-card-foot">
              <button type="submit" className="button is-primary">Add Note</button>
              <a className="button" onClick={this.props.toggleModalAdd}>Cancel</a>
            </footer>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNoteModal;
