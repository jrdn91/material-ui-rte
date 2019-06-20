import React from "react"
import { shallow, mount } from "enzyme"
import Editor from "./index"
import DividerControl from "../DividerControl"
import BlockStyleControl from "../BlockStyleControl"
import InlineStyleControls from "../InlineStyleControls"
import ListControls from "../ListControls"
import AlignmentControls from "../AlignmentControls"
import ImageUploadControl from "../ImageUploadControl"

describe("Editor", () => {
  it("Should render alignment control", () => {
    const component = shallow(<Editor />)

    expect(component).toMatchSnapshot()
  })

  it("Should not render block style controls when 'blockStyleControls' is set to 'false'", () => {
    const component = mount(<Editor blockStyleControls={false} />)

    expect(component.find(BlockStyleControl).exists()).toBe(false)
  })

  it("Should not render divider control when 'dividerControl' is set to 'false'", () => {
    const component = mount(<Editor dividerControl={false} />)

    expect(component.find(DividerControl).exists()).toBe(false)
  })

  it("Should not render inline style controls when 'inlineStyleControls' is set to 'false'", () => {
    const component = mount(<Editor inlineStyleControls={false} />)

    expect(component.find(InlineStyleControls).exists()).toBe(false)
  })

  it("Should not render list controls when 'listControls' is set to 'false'", () => {
    const component = mount(<Editor listControls={false} />)

    expect(component.find(ListControls).exists()).toBe(false)
  })

  it("Should not render alignment controls when 'alignmentControls' is set to 'false'", () => {
    const component = mount(<Editor alignmentControls={false} />)

    expect(component.find(AlignmentControls).exists()).toBe(false)
  })

  it("Should not render image upload control when 'imageUploadControl' is set to 'false'", () => {
    const component = mount(<Editor imageUploadControl={false} />)

    expect(component.find(ImageUploadControl).exists()).toBe(false)
  })
})
