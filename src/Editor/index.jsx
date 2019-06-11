import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import {Editor, EditorState, RichUtils} from "draft-js"
import { withStyles } from "@material-ui/styles"
import Paper from '@material-ui/core/Paper';
import BlockStyleControl from "../BlockStyleControl";
import styles from "./styles"
import InlineStyleControls from "../InlineStyleControls";

export class EditorComponent extends Component {
  static propTypes = {

  }

  state = {
    blockStyle: {},
    editorState: EditorState.createEmpty()
  }

  onEditorChange = editorState => this.setState({ editorState })

  handleBlockStyleChange = style => {
    this.setState({
      blockStyle: style
    })
    this.onEditorChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        style
      )
    );
  }

  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <section className={classes.toolbar}>
          <BlockStyleControl onChange={this.handleBlockStyleChange} />
          <InlineStyleControls onChange={this.handleInlineStyleChange} />
        </section>
        <Paper className={classes.editor}>
          <Editor editorState={this.state.editorState} onChange={this.onEditorChange} />
        </Paper>
      </Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(EditorComponent)
