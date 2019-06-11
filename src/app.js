import React, { Component } from "react"
import { withStyles } from "@material-ui/styles"
import Editor from "../src/Editor"

const styles = {
  editor: {
    margin: "120px auto",
    maxWidth: 768
  }
}

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.editor}>
        <Editor />
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(App)