import React from 'react'
import { withStyles } from "@material-ui/styles"
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft"
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter"
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight"
import clsx from 'clsx';
import styles from "./styles"

const INLINE_STYLES = [
  {icon: FormatAlignLeftIcon, style: 'ALIGN-LEFT'},
  {icon: FormatAlignCenterIcon, style: 'ALIGN-CENTER'},
  {icon: FormatAlignRightIcon, style: 'ALIGN-RIGHT'}
];

const InlineAlignmentControls = (props) => {
  const { classes } = props
  const currentStyle = props.editorState.getCurrentInlineStyle();
  const renderIcon = type => {
    let IconName = type.icon
    return <IconName className={clsx({
      [classes.activeIcon]: currentStyle.has(type.style)
    })} />
  }
  return (
    <ButtonGroup size="small" variant="contained">
      {INLINE_STYLES.map((type) =>
        <Button key={type.style} onClick={() => props.onChange(type.style)}>{renderIcon(type)}</Button>
        // <Button key={type.style} onClick={() => console.log(props.editorState.getBlockTree())}>{renderIcon(type)}</Button>
      )}
    </ButtonGroup>
  );
};

export default withStyles(styles)(InlineAlignmentControls)