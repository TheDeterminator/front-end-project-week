import '../App.css';
import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import Authenticate from './Authentication/Authenticate';

class CreateNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tag: '',
      tags: [],
    };
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  saveNote = event => {
    const newNote = {
      title: this.state.title,
      textBody: this.state.content,
      user_id: localStorage.getItem('userID'),
    };
    event.preventDefault();
    axios
      .post('https://nameless-harbor-91626.herokuapp.com/notes/', newNote)
      .then(response => {
        this.props.auth.history.push('/');
      })
      .catch(err => {
        console.log('Error is:', err);
      });
  };

  handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  };

  render() {
    console.log('Create note location', this.props.auth.location);
    return (
      <div className="note-list">
        <div className="list-sidebar">
          <h1>Lambda Notes</h1>
          <NavLink to="/">
            <button className="sidebar-button">View Your Notes</button>
          </NavLink>
          <NavLink to="/create">
            <button className="sidebar-button">+ Create New Note</button>
          </NavLink>
          <button onClick={this.handleLogout} className="logout-button">
            Logout
          </button>
        </div>
        <div className="right-bar">
          <h3 className="note-list-header">Create New Note: </h3>
          <form className="testing-form" onSubmit={this.saveNote}>
            <input
              className="title-input"
              name="title"
              placeholder="note title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <br />
            <textarea
              name="content"
              className="content-input"
              placeholder="Note Content"
              value={this.state.content}
              onChange={this.handleChange}
            />
            <br />
            <button className="sidebar-button save-create" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Authenticate(CreateNote);
