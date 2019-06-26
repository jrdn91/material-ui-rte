import React from "react"
import { createShallow, createMount } from "@material-ui/core/test-utils"
import { EditorState } from "draft-js"
import InlineStyleControls from "./index"
import Button from "@material-ui/core/Button"

describe("InlineStyleControls", () => {
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

  it("Should render block style control", () => {
    const component = shallow(<InlineStyleControls editorState={editorState} />)

    expect(component).toMatchSnapshot()
  })

  it("Should only render passed inline style buttons", () => {
    const controls = ["bold", "italic"]
    const component = mount(
      <InlineStyleControls editorState={editorState} controls={controls} />
    )

    const renderedButtons = component.find(Button)

    expect(renderedButtons.length).toBe(2)
    expect(renderedButtons.at(0).key()).toBe(".$BOLD")
    expect(renderedButtons.at(1).key()).toBe(".$ITALIC")
  })
})
