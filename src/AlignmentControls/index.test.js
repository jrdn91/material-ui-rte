import React from "react"
import { shallow, mount } from "enzyme"
import { EditorState } from "draft-js"
import AlignmentControls from "./index"
import Button from "@material-ui/core/Button"

describe("AlignmentControls", () => {
  let editorState

  beforeEach(() => {
    editorState = EditorState.createEmpty()
  })

  it("Should render alignment control", () => {
    const component = shallow(<AlignmentControls editorState={editorState} />)

    expect(component).toMatchSnapshot()
  })

  it("Should render only passed in alignment controls", () => {
    const controls = ["left", "right"]
    const component = mount(
      <AlignmentControls editorState={editorState} controls={controls} />
    )

    const renderedButtons = component.find(Button)

    expect(renderedButtons.length).toBe(2)
    expect(renderedButtons.at(0).key()).toBe(".$LEFT")
    expect(renderedButtons.at(1).key()).toBe(".$RIGHT")
  })
})
