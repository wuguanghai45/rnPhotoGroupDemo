import React, { Component } from 'react';
//import PropTypes from "prop-types";
import PhotoList from "./PhotoList";

class App extends Component {
  //static propTypes = {

  //}
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <PhotoList />
    );
  }
}

export default App;
