import React from "react"
import { Typography } from "@material-ui/core"

export default props => {
  const { children, "data-offset-key": dataOffsetKey, ...rest } = props
  return <Typography {...rest}>{props.children}</Typography>
}
