import React from "react"
import { shallow } from "enzyme"
import { EditorState } from "draft-js"
import ListControls from "./index"

describe("ListControls", () => {
  let editorState

  beforeEach(() => {
    editorState = EditorState.createEmpty()
  })

  it("Should render list control", () => {
    const component = shallow(<ListControls editorState={editorState} />)

    expect(component).toMatchSnapshot()
  })
})
