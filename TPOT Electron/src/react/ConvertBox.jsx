// React
import React, { Component } from 'react'
import './ConvertBox.css'

// Electron
const electron = window.require('electron')
const remote = electron.remote
const app = remote.app

// Node Built-In
const fs = remote.require('fs')
const path = remote.require('path')

// Custom/Community
const cat = require('../modules/cat')
const convert = require('../modules/converter')
const rn = require('random-number')



// Main Block
const content = "This is a document that has been converted is placed. Congrats! You have done it!"
cat.test()



class Name extends Component {
  constructor(props) {
    super(props)
    this.name = "Braden " + rn()

    this.state = {
      boxContent: '',
    };
  }

  // handleClick
  convertFile = () => {
    convert.convertFile('sample.docx')
    this.setState({boxContent: "File was converted"});
  };
  
  render() {
    return (
      <div className="convertBox">
        <button className="button" onClick={this.convertFile}>Convert File</button>
        <div className="box">{this.state.boxContent}</div>
      </div>
    )
  }
}

export default Name 