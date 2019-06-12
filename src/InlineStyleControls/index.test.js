import React from "react"
import { shallow } from "enzyme"
import { EditorState } from "draft-js"
import { unwrap } from "@material-ui/core/test-utils";
import InlineStyleControls from "./index"

const InlineStyleControlsUnwrapped = unwrap(InlineStyleControls);

describe("InlineStyleControls", () => {
  let editorState

  beforeEach(() => {
    editorState= EditorState.createEmpty()
  })

  it("Should render block style control", () => {
    const component = shallow(<InlineStyleControlsUnwrapped editorState={editorState} classes={{}} />);
  
    expect(component).toMatchSnapshot();
  });
});