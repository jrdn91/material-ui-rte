import React from "react"
import { shallow } from "enzyme"
import ListControls from "./index"

describe("ListControls", () => {
  it("Should render list style control", () => {
    const component = shallow(<ListControls />);
  
    expect(component).toMatchSnapshot();
  });
});