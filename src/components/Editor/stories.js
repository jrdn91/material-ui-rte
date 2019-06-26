import React from "react"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"
// Import the storybook libraries
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
// Import our component from this folder
import Editor from "./index"

const theme = createMuiTheme()

storiesOf("Editor").add("Basic", () => (
  <ThemeProvider theme={theme}>
    <Editor onChange={action("editor content changed")} />
  </ThemeProvider>
))
