import React, { Component } from "react"
import { withStyles } from "@material-ui/styles"
import Editor from "../src/Editor"
import { ThemeProvider } from "@material-ui/styles"
import theme from "./themes/main"

import editorState from "./editorState.json"

import "./editor.css"

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
      <ThemeProvider theme={theme}>
        <div className={classes.editor}>
          <Editor
            value={editorState}
            onChange={state => console.log(state)}
            blockStyleControls={["header-one"]}
            inlineStyleControls={["bold"]}
            listControls={["unordered-list"]}
            alignmentControls={["center"]}
          />
        </div>
      </ThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
