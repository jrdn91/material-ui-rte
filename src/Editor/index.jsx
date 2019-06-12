import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import {EditorState, RichUtils} from "draft-js"
import Editor from 'draft-js-plugins-editor';
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin'
import { withStyles } from "@material-ui/styles"
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import BlockStyleControl from "../BlockStyleControl";
import styles from "./styles"
import InlineStyleControls from "../InlineStyleControls";
import InlineAlignmentControls from "../InlineAlignmentControls";
import ListControls from "../ListControls";

const blockBreakoutPlugin = createBlockBreakoutPlugin()

const plugins = [blockBreakoutPlugin]

const styleMap = {
  'ALIGN-LEFT': {
    textAlign: "left",
    display: "block"
  },
  'ALIGN-CENTER': {
    textAlign: "center",
    display: "block"
  },
  'ALIGN-RIGHT': {
    textAlign: "right",
    display: "block"
  }
};

export class EditorComponent extends Component {
  static propTypes = {

  }

  state = {
    editorState: EditorState.createEmpty()
  }

  onEditorChange = editorState => this.setState({ editorState })

  handleBlockStyleChange = style => {
    this.onEditorChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        style
      )
    );
  }

  handleInlineStyleChange = style => {
    this.onEditorChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        style
      )
    );
  }

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.paper}>
        <Toolbar className={classes.toolbar}>
          <BlockStyleControl onChange={this.handleBlockStyleChange} />
          <InlineStyleControls editorState={this.state.editorState} onChange={this.handleInlineStyleChange} />
          <ListControls editorState={this.state.editorState} onChange={this.handleBlockStyleChange} />
          <InlineAlignmentControls editorState={this.state.editorState} onChange={this.handleInlineStyleChange} />
        </Toolbar>
        <div className={classes.editor} onClick={() => this.refs.editor.focus()}>
          <Editor
            ref="editor"
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            onChange={this.onEditorChange}
            plugins={plugins}
          />
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(EditorComponent)
