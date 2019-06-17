import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import Draft, {EditorState} from "draft-js"
import RichUtils from "../RichUtils"
import blockStyleFn from "../blockStyleFn"
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
import Typography from "../Typography";
const { Map } = require('immutable')

const blockRenderMap = Map({
  'unstyled': {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'span',
    wrapper: <Typography component="span" />,
  },
  'paragraph': {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'span',
    wrapper: <Typography component="span" />,
  },
  'header-one': {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'span',
    wrapper: <Typography variant="h1" />,
  },
  'header-two': {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'span',
    wrapper: <Typography variant="h2" />,
  },
  'header-three': {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'span',
    wrapper: <Typography variant="h3" />,
  },
  'header-four': {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'span',
    wrapper: <Typography variant="h4" />,
  },
  'header-five': {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'span',
    wrapper: <Typography variant="h5" />,
  },
  'header-six': {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'span',
    wrapper: <Typography variant="h6" />,
  },
  'blockquote': {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'span',
    wrapper: <Typography component="blockquote" />,
  },
  'ordered-list-item': {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'li',
    wrapper: <Typography component="ol" />,
  }
});

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
