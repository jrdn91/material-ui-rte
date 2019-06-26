import React from "react"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Button from "@material-ui/core/Button"
import RemoveIcon from "@material-ui/icons/Remove"

const DividerControl = props => {
  return (
    <ButtonGroup variant="contained" size="small">
      <Button onClick={() => props.onClick()}>
        <RemoveIcon />
      </Button>
    </ButtonGroup>
  )
}

export default DividerControl
