import React from "react"
import { shallow } from "enzyme"
import { EditorState } from "draft-js"
import { unwrap } from "@material-ui/core/test-utils";
import InlineAlignmentControls from "./index"

const InlineAlignmentControlsUnwrapped = unwrap(InlineAlignmentControls);

describe("InlineAlignmentControls", () => {
  let editorState

  beforeEach(() => {
    editorState= EditorState.createEmpty()
  })

  it("Should render alignment control", () => {
    const component = shallow(<InlineAlignmentControlsUnwrapped editorState={editorState} classes={{}} />);
  
    expect(component).toMatchSnapshot();
  });
});