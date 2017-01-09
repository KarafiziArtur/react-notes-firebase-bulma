import React, {Component} from 'react';
import './App.css';
import * as firebase from 'firebase';

import Navigation from './components/Navigation';
import Home from './components/Home';
import Note from './components/Note';

// import modal windows
import AddNoteModal from './components/AddNoteModal';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';

class App extends Component {

  constructor() {
    super();
    this.state = {
      notes: [],
      notesLoading: true,
      isLoggedIn: false,
      addModalIsActive: false,
      loginModalIsActive: false,
      signupModalIsActive: false,
      userEmail: null,
      userId: null
    };
  }

  componentDidMount() {
    // on auth state changed
    firebase.auth().onAuthStateChanged(user => {
      // if logged in or signed up successfully
      if(user) {
        // get the notes from current user by unique id (uid)
        firebase.database().ref(`users/${user.uid}/notes`).on('value', res => {
          const userData = res.val();
          const dataArray = [];
          // create an array from data object
          // eslint-disable-next-line
          for (let objKey in userData) {
            userData[objKey].key = objKey;
            dataArray.push(userData[objKey]);
          }

          // set notes and another state of app by data from firebase
          this.setState({
            notes: dataArray,
            notesLoading: false,
            isLoggedIn: true,
            userEmail: user.email,
            userId: user.uid
          });
        });
      } else {
        // if authentication is failed set to default state
        this.setState({
          notes: [],
          isLoggedIn: false,
          notesLoading: false
        });
      }
    });
  }

  /***************************************************
   * Toggle visibility of modal windows **************
   ***************************************************/

  toggleModalAdd = () => {
    this.setState({
      addModalIsActive: !this.state.addModalIsActive
    });
  };

  toggleModalLogin = () => {
    this.setState({
      loginModalIsActive: !this.state.loginModalIsActive
    });
  };

  toggleModalSignup = () => {
    this.setState({
      signupModalIsActive: !this.state.signupModalIsActive
    });
  };

  /***************************************************
   * Actions with notes ******************************
   ***************************************************/

  addNote = (title, description) => {
    // set default value for empty title or description or both
    if (!title) title = 'No title';
    if (!description) description = 'No desctiption';

    const userId = this.state.userId;
    const dbRef = firebase.database().ref(`users/${userId}/notes`);

    dbRef.push({
      title,
      description,
      created: Date.now()
    });

    // turn off visibility of this modal window
    this.toggleModalAdd();
  };

  saveNote = (noteId, noteData) => {
    const dbRef = firebase.database().ref(`users/${this.state.userId}/notes/${noteId}`);
    dbRef.update(noteData);
  };

  removeNote = (noteId) => {
    firebase.database().ref(`users/${this.state.userId}/notes/${noteId}`).remove();
  };

  /***************************************************
   * Render helpers **********************************
   ***************************************************/

  renderLoadingNotes = () => {
    const {isLoggedIn} = this.state;
    return (
      // if user is logged in
      isLoggedIn ?
        // render user's notes
        this.renderNotes()
        :
        // else render the Home Page View
        <Home />
    )
  };

  renderNotes = () => {
    const {notes} = this.state;
    return (
      // if notes is not empty array
      notes.length ?
        notes.map(note =>
          // render the Note component and passing to props the note's data
          <Note
            key={note.key}
            id={note.key}
            title={note.title}
            description={note.description}
            created={note.created}
            onRemove={this.removeNote}
            onSave={this.saveNote}
          />
        ).reverse()
        :
        // else render a message for empty notes array
        <h2 className="title is-4">There is no notes.</h2>
    );
  };

  /***************************************************
   * Signup, Login, Logout ***************************
   ***************************************************/

  login = (user) => {
    firebase.auth()
      .signInWithEmailAndPassword(user.email, user.password)
      // if logging in is successfully
      .then(res => {
        // show preloader
        this.setState({ notesLoading: true });
        // and turn off the modal window
        this.toggleModalLogin();
      })
      // else, if logging in is failed, working with errors
      // in this case just show an alert message
      .catch(err => alert(err.message));
  };

  signup = (newUser) => {
    firebase.auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      // if signing up is successfully
      .then(res => {
        // show preloader
        this.setState({ notesLoading: true });
        // and turn off the modal window
        this.toggleModalSignup();
      })
      // else, if logging in is failed, working with errors
      // in this case just show an alert message
      .catch(err => alert(err.message));
  };

  logout = () => {
    firebase.auth().signOut();
  };

  render() {
    const {notesLoading} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <Navigation toggleModalAdd={this.toggleModalAdd}
                      toggleModalLogin={this.toggleModalLogin}
                      toggleModalSignup={this.toggleModalSignup}
                      onLogout={this.logout}
                      isLoggedIn={this.state.isLoggedIn}
                      userEmail={this.state.userEmail}
          />
          <AddNoteModal isActive={this.state.addModalIsActive}
                        onSubmit={this.addNote}
                        toggleModalAdd={this.toggleModalAdd}
          />
          <LoginModal isActive={this.state.loginModalIsActive}
                      onSubmit={this.login}
                      toggleModalLogin={this.toggleModalLogin}
          />
          <SignupModal isActive={this.state.signupModalIsActive}
                       onSubmit={this.signup}
                       toggleModalSignup={this.toggleModalSignup}
          />
        </header>
        <main className="container">
          <div className="notes">
            {
              notesLoading ?
                <div className="preloading" />
                :
                this.renderLoadingNotes()
            }
          </div>
        </main>
      </div>
    );
  }
}

export default App;
