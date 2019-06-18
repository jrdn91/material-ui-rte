import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted"
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered"
import clsx from 'clsx';
import styles from "./styles"

const useStyles = makeStyles(styles, {
  name: "MuiRte-InlineListControls"
});

const LIST_STYLES = [
  {icon: FormatListNumberedIcon, style: 'ordered-list-item'},
  {icon: FormatListBulletedIcon, style: 'unordered-list-item'}
];

const ListControls = (props) => {
  const classes = useStyles()
  const currentStyle = props.editorState.getCurrentInlineStyle();
  const renderIcon = type => {
    let IconName = type.icon
    return <IconName className={clsx({
      [classes.activeIcon]: currentStyle.has(type.style)
    })} />
  }
  return (
    <ButtonGroup size="small" variant="contained">
      {LIST_STYLES.map((type) =>
        <Button key={type.style} onClick={() => props.onChange(type.style)}>{renderIcon(type)}</Button>
      )}
    </ButtonGroup>
  );
};

export default ListControls