import React from "react"
import { shallow } from "enzyme"
import { EditorState } from "draft-js"
import AlignmentControls from "./index"

describe("AlignmentControls", () => {
  let editorState

  beforeEach(() => {
    editorState = EditorState.createEmpty()
  })

  it("Should render alignment control", () => {
    const component = shallow(<AlignmentControls editorState={editorState} />)

    expect(component).toMatchSnapshot()
  })
})
