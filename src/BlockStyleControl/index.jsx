import React from "react"
import {
  FormControl,
  Input,
  InputAdornment,
  Menu,
  MenuItem,
  Typography
} from "@material-ui/core"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
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
    <FormControl style={{ width: "120px" }} id="menu-control">
      <Input
        onClick={handleClick}
        value={selectValue.label}
        endAdornment={
          <InputAdornment position="end">
            <ArrowDropDownIcon />
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
        container={document.getElementById("menu-control")}
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
