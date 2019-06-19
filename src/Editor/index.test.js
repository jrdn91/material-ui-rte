import React from "react"
import { shallow, mount } from "enzyme"
import Editor from "./index"
import DividerControl from "../DividerControl"
import BlockStyleControl from "../BlockStyleControl"

describe("Editor", () => {
  it("Should render alignment control", () => {
    const component = shallow(<Editor />)

    expect(component).toMatchSnapshot()
  })

  it("Should not render block style controls when 'blockStyleControls is set to 'false'", () => {
    const component = mount(<Editor blockStyleControls={false} />)

    expect(component.find(BlockStyleControl).exists()).toBe(false)
  })

  it("Should not render divider control when 'dividerControl is set to 'false'", () => {
    const component = mount(<Editor dividerControl={false} />)

    expect(component.find(DividerControl).exists()).toBe(false)
  })
})
