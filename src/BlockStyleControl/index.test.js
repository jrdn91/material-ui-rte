import React from "react"
import { shallow } from "enzyme"
import BlockStyleControl from "./index"

describe("BlockStyleControl", () => {
  it("Should render block style control", () => {
    const component = shallow(<BlockStyleControl />)

    expect(component).toMatchSnapshot()
  })
})
