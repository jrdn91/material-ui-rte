import React from 'react'
import { withStyles } from "@material-ui/styles"
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import FormatBoldIcon from "@material-ui/icons/FormatBold"
import FormatItalicIcon from "@material-ui/icons/FormatItalic"
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined"
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';
import styles from "./styles"

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'}
];

const InlineStyleControls = (props) => {
  const { classes } = props
  const currentStyle = props.editorState.getCurrentInlineStyle();
  const renderIcon = type => {
    let IconName;
    switch (type.label) {
      case "Bold":
        IconName = FormatBoldIcon
        break;
      case "Italic":
        IconName = FormatItalicIcon
        break;
      default:
        IconName = FormatUnderlinedIcon
    }
    return <IconName className={clsx({
      [classes.activeIcon]: currentStyle.has(type.style)
    })} />
  }
  return (
    <ButtonGroup size="small" variant="contained">
      {INLINE_STYLES.map((type) =>
        <Button key={type.style} onClick={() => props.onChange(type.style)}>{renderIcon(type)}</Button>
      )}
    </ButtonGroup>
  );
};

export default withStyles(styles)(InlineStyleControls)