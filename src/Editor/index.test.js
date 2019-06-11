import React from "react"
import { shallow } from "enzyme"
import Editor from "./index"

describe("Editor", () => {
  it("Should render basic editor", () => {
    const component = shallow(<Editor debug />);
  
    expect(component).toMatchSnapshot();
  });
});