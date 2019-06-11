import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/styles"
import BlockStyleControl from "../BlockStyleControl";

const styles = {
}

export class EditorComponent extends Component {
  static propTypes = {

  }

  state = {
    blockStyle: 'paragraph'
  }

  handleBlockStyleChange = style => {
    this.setState({
      blockStyle: style
    })
  }

  render() {
    const { classes } = this.props
    return (
      <section className={classes.toolbar}>
        <BlockStyleControl value={this.state.blockStyle} onChange={this.handleBlockStyleChange} />
      </section>
    )
  }
}

export default withStyles(styles, { withTheme: true })(EditorComponent)
