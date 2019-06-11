import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

const styles = {
}

export class EditorComponent extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
        <Typography>Hello World</Typography>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(EditorComponent)
