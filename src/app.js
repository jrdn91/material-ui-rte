import React, { Component } from "react"
import Editor from "../src/Editor"

const styles = {
}

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <Editor />
    )
  }
}

export default App