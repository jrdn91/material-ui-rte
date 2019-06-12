import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import {EditorState, RichUtils} from "draft-js"
import Editor from 'draft-js-plugins-editor';
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin'
import createDividerPlugin from 'draft-js-divider-plugin';
import { withStyles } from "@material-ui/styles"
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import BlockStyleControl from "../BlockStyleControl";
import styles from "./styles"
import InlineStyleControls from "../InlineStyleControls";
import InlineAlignmentControls from "../InlineAlignmentControls";
import ListControls from "../ListControls";
import DividerControl from "../DividerControl"
import Divider from "./Divider"
import BlockRenderer from "../BlockRenderer"
import StyleRenderer from "../StyleRenderer"

const blockBreakoutPlugin = createBlockBreakoutPlugin()
const dividerPlugin = createDividerPlugin({ blockType: 'divider', component: Divider });

const { addDivider } = dividerPlugin

const plugins = [blockBreakoutPlugin, dividerPlugin]

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
    let newStyle = {}
    try {
      const currentStyle = JSON.parse(RichUtils.getCurrentBlockType(this.state.editorState))
      newStyle = {
        ...currentStyle,
        blockStyle: style
      }
    } catch(e) {
      newStyle = {
        blockStyle: style
      }
    }
    this.onEditorChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        JSON.stringify(newStyle)   
      )
    );
  }

  handleAlignmentStyleChange = style => {
    let newStyle = {}
    try {
      const currentStyle = JSON.parse(RichUtils.getCurrentBlockType(this.state.editorState))
      newStyle = {
        ...currentStyle,
        alignmentStyle: style
      }
    } catch(e) {
      newStyle = {
        alignmentStyle: style
      }
    }
    this.onEditorChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        JSON.stringify(newStyle)   
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

  handleDividerControlClick = () => {
    this.onEditorChange(addDivider(this.state.editorState))
  }

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.paper}>
        <Toolbar className={classes.toolbar}>
          <BlockStyleControl onChange={this.handleBlockStyleChange} />
          <DividerControl onClick={this.handleDividerControlClick} />
          <InlineStyleControls editorState={this.state.editorState} onChange={this.handleInlineStyleChange} />
          <ListControls editorState={this.state.editorState} onChange={this.handleBlockStyleChange} />
          <InlineAlignmentControls editorState={this.state.editorState} onChange={this.handleAlignmentStyleChange} />
        </Toolbar>
        <div className={classes.editor} onClick={() => this.refs.editor.focus()}>
          <Editor
            ref="editor"
            blockStyleFn={StyleRenderer}
            editorState={this.state.editorState}
            onChange={this.onEditorChange}
            plugins={plugins}
            blockRendererFn={BlockRenderer}
          />
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(EditorComponent)
