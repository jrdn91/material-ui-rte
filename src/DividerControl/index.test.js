import React from "react"
import { shallow } from "enzyme"
import DividerControl from "./index"

describe("DividerControl", () => {

  it("Should render alignment control", () => {
    const component = shallow(<DividerControl />);
  
    expect(component).toMatchSnapshot();
  });
});