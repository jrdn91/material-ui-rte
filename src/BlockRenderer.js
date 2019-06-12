import Typography from "./Typography"
import { find } from "lodash"
import BLOCK_TYPES from "./BlockStyleControl/blockTypes"

const blockRenderer = (contentBlock) => {
  const type = contentBlock.getType()

  try {
    const types = JSON.parse(type)
    if (types.hasOwnProperty("blockStyle")) {
      const blockType = find(BLOCK_TYPES, ["style", types.blockStyle])
      if (blockType) {
        let props = {}
        props.variant = blockType.variant
        return {
          component: Typography,
          editable: true,
          props
        }
      } 
    } else {
      return {
        component: Typography,
        editable: true
      }
    }
  } catch(e) {
    return {
      component: Typography,
      editable: true
    }
  }
}

export default blockRenderer