import React, { Component } from 'react'
//import classnames from 'classnames'
//import './style.css'

//const { fetchCred, j } = require('../../../config/config')

export default class Notebook extends Component {
  //constructor() {
    //super()
  //}

  //componentDidMount() {
  //}

  render() {
    const { guid, name } = this.props
    return (
      <div id={guid}>
      { name }
      </div>
    )
  }
}
