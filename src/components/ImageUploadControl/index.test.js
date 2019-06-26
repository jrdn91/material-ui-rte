import React from "react"
import { shallow } from "enzyme"
import ImageUploadControl from "./index"

describe("ImageUploadControl", () => {
  it("Should render image upload control", () => {
    const component = shallow(<ImageUploadControl />)

    expect(component).toMatchSnapshot()
  })
})
