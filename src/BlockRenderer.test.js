import React from "react"
import BlockRenderer from "./BlockRenderer"
import Typography from "./Typography"

class contentBlock {
  constructor(type, text) {
    this.contentBlockType = type
    this.contentBlockText = text
  }
  contentBlockType = ""
  contentBlockText = ""

  getType() {
    return this.contentBlockType
  }

  getText() {
    return this.contentBlockText
  }
}

describe("BlockRenderer", () => {
  const paragraphBlock = new contentBlock("paragraph")
  it("Should return typography component for proper block types", () => {
    const renderedBlock = BlockRenderer(paragraphBlock)
    expect(renderedBlock).toEqual(
      expect.objectContaining({
        component: Typography,
        editable: true
      })
    )
  });
});