import React from "react"
import { shallow, mount } from "enzyme"
import Editor from "./index"

describe("Editor", () => {
  it("Should render alignment control", () => {
    const component = shallow(<Editor />)

    expect(component).toMatchSnapshot()
  })

  it("Should not render block style controls when 'blockStyleControls is set to 'false'", () => {
    const component = mount(<Editor blockStyleControls={false} />)

    expect(component.find("#mur-editor-block-style-controls").exists()).toBe(false);
  })
})
