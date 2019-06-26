import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import Draft, {
  EditorState,
  convertFromRaw,
  convertToRaw,
  AtomicBlockUtils,
  getDefaultKeyBinding,
  KeyBindingUtil
} from "draft-js"
import RichUtils from "../RichUtils"
import blockStyleFn from "../blockStyleFn"
import blockRenderMap from "../blockRenderMap"
import Editor from "draft-js-plugins-editor"
import createBlockBreakoutPlugin from "draft-js-block-breakout-plugin"
import createImagePlugin from "draft-js-image-plugin"
import createDividerPlugin from "draft-js-divider-plugin"
import { makeStyles } from "@material-ui/styles"
import { StylesProvider, createGenerateClassName } from "@material-ui/styles"
import Paper from "@material-ui/core/Paper"
import Toolbar from "@material-ui/core/Toolbar"
import BlockStyleControl from "../BlockStyleControl"
import styles from "./styles"
import InlineStyleControls from "../InlineStyleControls"
import AlignmentControls from "../AlignmentControls"
import ListControls from "../ListControls"
import DividerControl from "../DividerControl"
import Divider from "./Divider"
import ImageUploadControl from "../ImageUploadControl"

// SETUP KEYBINDINGS
const { hasCommandModifier } = KeyBindingUtil

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

const imagePlugin = createImagePlugin()

const { addDivider } = dividerPlugin

const plugins = [blockBreakoutPlugin, dividerPlugin, imagePlugin]

// SETUP TYPES FOR PROP CHECKING
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
const availableListTypes = ["ordered-list", "unordered-list"]
const availableAlignmentStyles = ["left", "center", "right"]

const myKeyBindingFn = e => {
  // hook up alignment shortcuts
  if (e.keyCode === 76 /* `L` key */ && hasCommandModifier(e)) {
    return "align-left"
  }
  if (e.keyCode === 69 /* `E` key */ && hasCommandModifier(e)) {
    return "align-center"
  }
  if (e.keyCode === 82 /* `R` key */ && hasCommandModifier(e)) {
    return "align-right"
  }
  return getDefaultKeyBinding(e)
}

export const EditorComponent = props => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  useEffect(() => {
    if (props.value) {
      setEditorState(EditorState.createWithContent(convertFromRaw(props.value)))
    }
  }, [props.value])
  const editorRef = useRef(null)

  const classes = useStyles()

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
  const handleFile = file => {
    console.log(file)
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      { src: file.preview, file }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    })
    const editorStateWithImage = AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      " "
    )
    onEditorChange(editorStateWithImage)
  }

  const handlekeyCommand = command => {
    if (command.indexOf("align-") > -1 && props.alignmentControls !== false) {
      let allowedControls = []
      if (props.alignmentControls === true) {
        allowedControls = availableAlignmentStyles
      } else {
        allowedControls = props.alignmentControls
      }
      const alignment = command.replace("align-", "")
      if (allowedControls.indexOf(alignment) > -1) {
        handleAlignmentStyleChange(alignment.toUpperCase())
        return "handled"
      }
      return "not-handled"
    }
    return "not-handled"
  }

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
          {props.imageUploadControl !== false && (
            <ImageUploadControl onFile={handleFile} />
          )}
          {props.inlineStyleControls !== false && (
            <InlineStyleControls
              controls={props.inlineStyleControls}
              editorState={editorState}
              onChange={handleInlineStyleChange}
            />
          )}
          {props.listControls !== false && (
            <ListControls
              controls={props.listControls}
              editorState={editorState}
              onChange={handleBlockStyleChange}
            />
          )}
          {props.alignmentControls !== false && (
            <AlignmentControls
              controls={props.alignmentControls}
              editorState={editorState}
              onChange={handleAlignmentStyleChange}
            />
          )}
        </Toolbar>
        <div
          className={classes.editor}
          onClick={() => editorRef.current.focus()}
        >
          <Editor
            ref={editorRef}
            handleKeyCommand={handlekeyCommand}
            keyBindingFn={myKeyBindingFn}
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
  imageUploadControl: PropTypes.bool,
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
        if (availableInlineStyles.indexOf(p) === -1) {
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
  ]),
  listStyleControls: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(function(
      propValue,
      key,
      componentName,
      location,
      propFullName
    ) {
      return propValue.some(p => {
        if (availableListTypes.indexOf(p) === -1) {
          return new Error(
            `Invalid prop ${propFullName} supplied to ${componentName}. Should be one of ${availableListTypes.join(
              " | "
            )}`
          )
        } else {
          return true
        }
      })
    })
  ]),
  alignmentControls: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(function(
      propValue,
      key,
      componentName,
      location,
      propFullName
    ) {
      return propValue.some(p => {
        if (availableAlignmentStyles.indexOf(p) === -1) {
          return new Error(
            `Invalid prop ${propFullName} supplied to ${componentName}. Should be one of ${availableAlignmentStyles.join(
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
  inlineStyleControls: true,
  listControls: true,
  alignmentControls: true
}

export default EditorComponent
