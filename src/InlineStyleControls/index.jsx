import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import FormatBoldIcon from "@material-ui/icons/FormatBold"
import FormatItalicIcon from "@material-ui/icons/FormatItalic"
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined"
import clsx from "clsx"
import styles from "./styles"

const useStyles = makeStyles(styles, {
  name: "MuiRte-InlineStyleControls"
})

const INLINE_STYLES = [
  { icon: FormatBoldIcon, style: "BOLD" },
  { icon: FormatItalicIcon, style: "ITALIC" },
  { icon: FormatUnderlinedIcon, style: "UNDERLINE" }
]

const InlineStyleControls = props => {
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
  return (
    <ButtonGroup size="small" variant="contained">
      {INLINE_STYLES.map(type => (
        <Button key={type.style} onClick={() => props.onChange(type.style)}>
          {renderIcon(type)}
        </Button>
      ))}
    </ButtonGroup>
  )
}

export default InlineStyleControls
