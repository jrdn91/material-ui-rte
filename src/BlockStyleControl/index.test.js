import React from "react"
import { shallow, mount } from "enzyme"
import BlockStyleControl from "./index"
import { MenuItem } from "@material-ui/core"

describe("BlockStyleControl", () => {
  it("Should render block style control", () => {
    const component = shallow(<BlockStyleControl />)

    expect(component).toMatchSnapshot()
  })

  it("Should only render passed blockStyles", () => {
    const controls = ["header-one", "header-two"]
    const component = mount(<BlockStyleControl controls={controls} />)

    expect(component.find(MenuItem).length).toBe(2)
  })
})
