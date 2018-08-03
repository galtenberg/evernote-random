import React, { Component } from 'react'

export default class Notebook extends Component {
  handleClick = () => {
    this.props.notebookChanged(this.props.guid)
  }

  render() {
    const { name } = this.props
    return <button onClick={this.handleClick}>{name}</button>
  }
}
