import React from "react"
import { ButtonGroup, Button } from "@material-ui/core"
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
