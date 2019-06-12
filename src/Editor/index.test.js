import React from "react"
import { shallow } from "enzyme"
import { unwrap } from "@material-ui/core/test-utils";
import Editor from "./index"

const EditorUnwrapped = unwrap(Editor);

describe("Editor", () => {
  it("Should render alignment control", () => {
    const component = shallow(<EditorUnwrapped classes={{}} />);
  
    expect(component).toMatchSnapshot();
  });
});