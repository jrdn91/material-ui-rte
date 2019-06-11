import React from "react"
import { shallow } from "enzyme"
import Editor from "./index"

describe("Editor", () => {
  it("should render correctly in 'debug' mode", () => {
    const component = shallow(<Editor debug />);
  
    expect(component).toMatchSnapshot();
  });
});