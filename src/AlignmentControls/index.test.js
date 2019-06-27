import React from "react"
import { createShallow, createMount } from "@material-ui/core/test-utils"
import { EditorState } from "draft-js"
import AlignmentControls from "./index"
import Button from "@material-ui/core/Button"

describe("AlignmentControls", () => {
  let editorState
  let shallow
  let mount

  beforeAll(() => {
    shallow = createShallow()
    mount = createMount()
  })

  afterAll(() => {
    mount.cleanUp()
  })

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

    renderedButtons.at(0).children()

    expect(renderedButtons.length).toBe(2)
    expect(renderedButtons.at(0).prop("id")).toBe("LEFT")
    expect(renderedButtons.at(1).prop("id")).toBe("RIGHT")
  })
})
