import React from "react"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Button from "@material-ui/core/Button"
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"

const ImageUploadControl = props => {
  return (
    <ButtonGroup variant="contained" size="small">
      <Button onClick={() => props.onClick()}>
        <AddPhotoAlternateIcon />
      </Button>
    </ButtonGroup>
  )
}

export default ImageUploadControl
