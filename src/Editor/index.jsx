import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import Draft, { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import RichUtils from "../RichUtils"
import blockStyleFn from "../blockStyleFn"
import blockRenderMap from "../blockRenderMap"
import Editor from "draft-js-plugins-editor"
import createBlockBreakoutPlugin from "draft-js-block-breakout-plugin"
import createDividerPlugin from "draft-js-divider-plugin"
import { makeStyles } from "@material-ui/core/styles"
import { StylesProvider, createGenerateClassName } from "@material-ui/styles"
import Paper from "@material-ui/core/Paper"
import Toolbar from "@material-ui/core/Toolbar"
import BlockStyleControl from "../BlockStyleControl"
import styles from "./styles"
import InlineStyleControls from "../InlineStyleControls"
import InlineAlignmentControls from "../InlineAlignmentControls"
import ListControls from "../ListControls"
import DividerControl from "../DividerControl"
import Divider from "./Divider"

const generateClassName = createGenerateClassName({
  productionPrefix: "mur"
})

const useStyles = makeStyles(styles, {
  name: "MuiRte-Editor"
})

const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(
  blockRenderMap
)

const blockBreakoutPlugin = createBlockBreakoutPlugin()
const dividerPlugin = createDividerPlugin({
  blockType: "divider",
  component: Divider
})

const { addDivider } = dividerPlugin

const plugins = [blockBreakoutPlugin, dividerPlugin]

export const EditorComponent = props => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  useEffect(() => {
    if (props.value) {
      setEditorState(EditorState.createWithContent(convertFromRaw(props.value)))
    }
  }, [])
  const editorRef = useRef(null)

  const onEditorChange = editorState => {
    setEditorState(editorState)
    if (props.hasOwnProperty("onChange")) {
      props.onChange(convertToRaw(editorState.getCurrentContent()))
    }
  }

  const handleBlockStyleChange = style => {
    onEditorChange(RichUtils.toggleBlockType(editorState, style))
  }

  const handleAlignmentStyleChange = style => {
    onEditorChange(RichUtils.toggleAlignment(editorState, style))
  }

  const handleInlineStyleChange = style => {
    onEditorChange(RichUtils.toggleInlineStyle(editorState, style))
  }

  const handleDividerControlClick = () => {
    onEditorChange(addDivider(editorState))
  }
  const classes = useStyles()
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Paper className={classes.paper}>
        <Toolbar className={classes.toolbar}>
          {props.blockStyleControls !== false && (
            <BlockStyleControl
              controls={props.blockStyleControls}
              onChange={handleBlockStyleChange}
            />
          )}
          {props.dividerControl !== false && (
            <DividerControl onClick={handleDividerControlClick} />
          )}
          {props.inlineStyleControls !== false && (
            <InlineStyleControls
              editorState={editorState}
              onChange={handleInlineStyleChange}
            />
          )}
          <ListControls
            editorState={editorState}
            onChange={handleBlockStyleChange}
          />
          <InlineAlignmentControls
            editorState={editorState}
            onChange={handleAlignmentStyleChange}
          />
        </Toolbar>
        <div
          className={classes.editor}
          onClick={() => editorRef.current.focus()}
        >
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
    </StylesProvider>
  )
}

const availableBlockStyles = [
  "paragraph",
  "blockquote",
  "header-one",
  "header-two",
  "header-three",
  "header-four",
  "header-five",
  "header-six"
]

const availableInlineStyles = ["bold", "italic", "underline"]

EditorComponent.propTypes = {
  blockStyleControls: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(function(
      propValue,
      key,
      componentName,
      location,
      propFullName
    ) {
      return propValue.some(p => {
        if (availableBlockStyles.indexOf(p) === -1) {
          return new Error(
            `Invalid prop ${propFullName} supplied to ${componentName}. Should be one of ${availableBlockStyles.join(
              " | "
            )}`
          )
        } else {
          return true
        }
      })
    })
  ]),
  dividerControl: PropTypes.bool,
  inlineStyleControls: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(function(
      propValue,
      key,
      componentName,
      location,
      propFullName
    ) {
      return propValue.some(p => {
        if (availableBlockStyles.indexOf(p) === -1) {
          return new Error(
            `Invalid prop ${propFullName} supplied to ${componentName}. Should be one of ${availableInlineStyles.join(
              " | "
            )}`
          )
        } else {
          return true
        }
      })
    })
  ])
}

EditorComponent.defaultProps = {
  blockStyleControls: true,
  dividerControl: true,
  inlineStyleControls: true
}

export default EditorComponent
