import React from "react"
import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Typography from "@material-ui/core/Typography"
import BLOCK_TYPES from "./blockTypes"

const BlockStyleControl = props => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectValue, setSelectValue] = React.useState({
    label: "Paragraph",
    variant: "body1",
    style: "paragraph"
  })

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }
  function blockTypes() {
    if (Array.isArray(props.controls)) {
      return BLOCK_TYPES.filter(b => props.controls.indexOf(b.style) > -1)
    } else {
      return BLOCK_TYPES
    }
  }
  return (
    <FormControl style={{ width: "120px" }} id="mur-editor-block-style-controls">
      <Input
        onClick={handleClick}
        value={selectValue.label}
        endAdornment={
          <InputAdornment position="end">
            <ArrowDropDownIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
          </InputAdornment>
        }
        inputProps={{
          readOnly: true
        }}
      />
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {blockTypes().map(type => (
          <MenuItem
            key={type.style}
            onClick={() => {
              setSelectValue(type)
              props.onChange(type.style)
              handleClose()
            }}
          >
            <Typography variant={type.variant}>{type.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </FormControl>
  )
}

export default BlockStyleControl
