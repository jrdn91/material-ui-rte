import React from "react"
import { shallow } from "enzyme"
import InlineStyleControls from "./index"

describe("InlineStyleControls", () => {
  it("Should render block style control", () => {
    const component = shallow(<InlineStyleControls />);
  
    expect(component).toMatchSnapshot();
  });
});