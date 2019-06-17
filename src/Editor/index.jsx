import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import Draft, {EditorState} from "draft-js"
import RichUtils from "../RichUtils"
import blockStyleFn from "../blockStyleFn"
import blockRenderMap from "../blockRenderMap"
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

const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);

const blockBreakoutPlugin = createBlockBreakoutPlugin()
const dividerPlugin = createDividerPlugin({ blockType: 'divider', component: Divider });

const { addDivider } = dividerPlugin

const plugins = [blockBreakoutPlugin, dividerPlugin]

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
    )
  }

  handleAlignmentStyleChange = style => {
    this.onEditorChange(
      RichUtils.toggleAlignment(
        this.state.editorState,
        style
      )
    )
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
            blockStyleFn={blockStyleFn}
            blockRenderMap={extendedBlockRenderMap}
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
