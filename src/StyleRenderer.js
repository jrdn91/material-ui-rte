const styleRenderer = (contentBlock) => {
  const type = contentBlock.getType()
  try {
    const types = JSON.parse(type)
    console.log(types)
    if (types.hasOwnProperty("alignmentStyle")) {
      return types.alignmentStyle
    }
  } catch(e) {
    return ""
  }
}

export default styleRenderer