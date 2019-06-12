import React from "react"
import { shallow } from "enzyme"
import { EditorState } from "draft-js"
import { unwrap } from "@material-ui/core/test-utils";
import ListControls from "./index"

const ListControlsUnwrapped = unwrap(ListControls);

describe("ListControls", () => {
  let editorState

  beforeEach(() => {
    editorState= EditorState.createEmpty()
  })

  it("Should render list control", () => {
    const component = shallow(<ListControlsUnwrapped editorState={editorState} classes={{}} />);
  
    expect(component).toMatchSnapshot();
  });
});