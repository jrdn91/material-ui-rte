import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft"
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter"
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight"
import clsx from "clsx"
import styles from "./styles"

const useStyles = makeStyles(styles, {
  name: "MuiRte-AlignmentControls"
})

const ALIGNMENT_TYPES = [
  { icon: FormatAlignLeftIcon, style: "LEFT" },
  { icon: FormatAlignCenterIcon, style: "CENTER" },
  { icon: FormatAlignRightIcon, style: "RIGHT" }
]

const AlignmentControls = props => {
  const classes = useStyles()
  const currentStyle = props.editorState.getCurrentInlineStyle()
  const renderIcon = type => {
    let IconName = type.icon
    return (
      <IconName
        className={clsx({
          [classes.activeIcon]: currentStyle.has(type.style)
        })}
      />
    )
  }
  function alignmentTypes() {
    if (Array.isArray(props.controls)) {
      return ALIGNMENT_TYPES.filter(
        b => props.controls.indexOf(b.style.toLowerCase()) > -1
      )
    } else {
      return ALIGNMENT_TYPES
    }
  }
  return (
    <ButtonGroup size="small" variant="contained">
      {alignmentTypes().map(
        type => (
          <Button
            key={type.style}
            onClick={() =>
              props.onChange(
                type.style,
                ALIGNMENT_TYPES.filter(t => t.style !== type.style).map(
                  t => t.style
                )
              )
            }
          >
            {renderIcon(type)}
          </Button>
        )
        // <Button key={type.style} onClick={() => console.log(props.editorState.getBlockTree())}>{renderIcon(type)}</Button>
      )}
    </ButtonGroup>
  )
}

export default AlignmentControls
