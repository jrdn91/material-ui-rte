import React from "react"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"
import blueGrey from "@material-ui/core/colors/blueGrey"
import lightBlue from "@material-ui/core/colors/lightBlue"
// Import the storybook libraries
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
// Import our component from this folder
import Editor from "./index"

const theme = createMuiTheme({
  palette: {
    text: {
      primary: blueGrey[700]
    }
  },
  overrides: {
    MuiButton: {
      contained: {
        backgroundColor: blueGrey[50],
        color: blueGrey[700]
      }
    },
    MuiToolbar: {
      regular: {
        backgroundColor: [lightBlue[400], "!important"]
      }
    },
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: "1px solid white"
        },
        "&:after": {
          borderBottom: "2px solid white"
        },
        "&:hover:not($disabled):before": {
          borderBottom: "2px solid white"
        }
      }
    },
    MuiInputBase: {
      root: {
        color: "#fff"
      }
    }
  }
})

storiesOf("Editor")
  .add("Basic", () => <Editor onChange={action("editor content changed")} />)
  .add("Customized Controls", () => (
    <Editor
      onChange={action("editor content changed")}
      blockStyleControls={[
        "paragraph",
        "header-one",
        "header-two",
        "header-three"
      ]}
      imageUploadControl={false}
      alignmentControls={["left", "center"]}
    />
  ))
  .add("Custom Theme", () => (
    <ThemeProvider theme={theme}>
      <Editor onChange={action("editor content changed")} />
    </ThemeProvider>
  ))
