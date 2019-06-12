import React from 'react'
import Typography from "@material-ui/core/Typography"
import { EditorBlock } from "draft-js"

export default function TypographyComponent(props) {
  const { blockProps } = props
  return (
    <Typography component="span" {...blockProps}>
      <EditorBlock {...props}>
        {props.block.getText()}
      </EditorBlock>
    </Typography>
  )
}
