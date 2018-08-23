import React, { Component } from 'react';
import './App.css';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import {Route} from 'react-router-dom';
import axios from 'axios';
import ViewNote from './components/ViewNote';
import Authenticate from './components/Authentication/Authenticate';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    }
  }

  /*Fetches data from the server once the App component mounts then passes it to the state to be displayed*/
  componentDidMount() {
    axios
      .get('https://nameless-harbor-91626.herokuapp.com/notes/all')
      .then(response => {
        console.log('HERE', response.data);
        this.setState({notes: response.data})
      })
      .catch(err => {
        console.log(err);
      })
  }

/*Exported function met to fetch API data for this state via a different component*/
  setData = () => {
    axios
      .get('https://nameless-harbor-91626.herokuapp.com/notes/all')
      .then(response => {
        this.setState({notes: response.data})
      })
      .catch(err => {
        console.log("Set Data failed:", err)
      })
  }

  render() {
    console.log('App location', this.props.location);
    return (
      <div className="App">
        <Route exact path='/' component={props => <NotesList {...props}
          notes={this.state.notes} />} />
        <Route exact path="/create" component={props => <CreateNote {...props}
        setData={this.setData} />} />
        <Route exact path="/notes/:id" component={props => <ViewNote {...props}
        setData={this.setData} />} />
      </div>
    );
  }
}

export default Authenticate(App);
// export default App;
