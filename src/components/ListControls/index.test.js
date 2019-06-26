import React from "react"
import { createShallow, createMount } from "@material-ui/core/test-utils"
import { EditorState } from "draft-js"
import ListControls from "./index"
import Button from "@material-ui/core/Button"

describe("ListControls", () => {
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

  it("Should render list control", () => {
    const component = shallow(<ListControls editorState={editorState} />)

    expect(component).toMatchSnapshot()
  })
  it("should only render specified list control", () => {
    const controls = ["unordered-list"]
    const component = mount(
      <ListControls editorState={editorState} controls={controls} />
    )

    const renderedButtons = component.find(Button)

    expect(renderedButtons.length).toBe(1)
    expect(renderedButtons.at(0).key()).toBe(".$unordered-list-item")
  })
})
