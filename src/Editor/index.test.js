import React from "react"
import { shallow } from "enzyme"
import Editor from "./index"

describe("Editor", () => {
  it("Should render alignment control", () => {
    const component = shallow(<Editor />)

    expect(component).toMatchSnapshot()
  })
})
