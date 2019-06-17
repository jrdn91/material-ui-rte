import React, { useState, useRef } from "react"
import Draft, {EditorState} from "draft-js"
import RichUtils from "../RichUtils"
import blockStyleFn from "../blockStyleFn"
import blockRenderMap from "../blockRenderMap"
import Editor from 'draft-js-plugins-editor';
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin'
import createDividerPlugin from 'draft-js-divider-plugin';
import { makeStyles } from "@material-ui/styles"
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import BlockStyleControl from "../BlockStyleControl";
import styles from "./styles"
import InlineStyleControls from "../InlineStyleControls";
import InlineAlignmentControls from "../InlineAlignmentControls";
import ListControls from "../ListControls";
import DividerControl from "../DividerControl"
import Divider from "./Divider"

const useStyles = makeStyles(styles);

const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);

const blockBreakoutPlugin = createBlockBreakoutPlugin()
const dividerPlugin = createDividerPlugin({ blockType: 'divider', component: Divider });

const { addDivider } = dividerPlugin

const plugins = [blockBreakoutPlugin, dividerPlugin]

export const EditorComponent = (props) => {
  // state = {
  //   editorState: EditorState.createEmpty()
  // }
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const editorRef = useRef(null)

  const onEditorChange = editorState => setEditorState(editorState)

  const handleBlockStyleChange = style => {
    onEditorChange(
      RichUtils.toggleBlockType(
        editorState,
        style
      )
    )
  }

  const handleAlignmentStyleChange = style => {
    onEditorChange(
      RichUtils.toggleAlignment(
        editorState,
        style
      )
    )
  }

  const handleInlineStyleChange = style => {
    onEditorChange(
      RichUtils.toggleInlineStyle(
        editorState,
        style
      )
    );
  }

  const handleDividerControlClick = () => {
    onEditorChange(addDivider(editorState))
  }
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <Toolbar className={classes.toolbar}>
        <BlockStyleControl onChange={handleBlockStyleChange} />
        <DividerControl onClick={handleDividerControlClick} />
        <InlineStyleControls editorState={editorState} onChange={handleInlineStyleChange} />
        <ListControls editorState={editorState} onChange={handleBlockStyleChange} />
        <InlineAlignmentControls editorState={editorState} onChange={handleAlignmentStyleChange} />
      </Toolbar>
      <div className={classes.editor} onClick={() => editorRef.current.focus()}>
        <Editor
          ref={editorRef}
          blockStyleFn={blockStyleFn}
          blockRenderMap={extendedBlockRenderMap}
          editorState={editorState}
          onChange={onEditorChange}
          plugins={plugins}
        />
      </div>
    </Paper>
  )
}

export default EditorComponent
