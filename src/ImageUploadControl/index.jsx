import React, { Fragment } from "react"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Button from "@material-ui/core/Button"
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"

const ImageUploadControl = props => {
  const handleChange = files => {
    let file = files[0]
    file.preview = URL.createObjectURL(files[0])
    props.onFile(file)
    setTimeout(() => {
      document.getElementById("file-input").value = null
    }, 50)
  }
  return (
    <Fragment>
      <ButtonGroup variant="contained" size="small">
        <Button onClick={() => document.getElementById("file-input").click()}>
          <AddPhotoAlternateIcon />
        </Button>
      </ButtonGroup>
      <input
        type="file"
        style={{
          display: "none"
        }}
        onChange={e => handleChange(e.target.files)}
        name="file"
        id="file-input"
        accept="image/*"
      />
    </Fragment>
  )
}

export default ImageUploadControl
