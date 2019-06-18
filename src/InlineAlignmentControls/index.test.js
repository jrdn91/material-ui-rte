import React from "react"
import { shallow } from "enzyme"
import { EditorState } from "draft-js"
import InlineAlignmentControls from "./index"

describe("InlineAlignmentControls", () => {
  let editorState

  beforeEach(() => {
    editorState = EditorState.createEmpty()
  })

  it("Should render alignment control", () => {
    const component = shallow(
      <InlineAlignmentControls editorState={editorState} />
    )

    expect(component).toMatchSnapshot()
  })
})
