import React from "react"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"
// Import the storybook libraries
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
// Import our component from this folder
import Editor from "./index"

const theme = createMuiTheme({
  palette: {
    text: {
      primary: "#f00"
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
