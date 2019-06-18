import React from "react"
import { shallow } from "enzyme"
import { EditorState } from "draft-js"
import InlineStyleControls from "./index"

describe("InlineStyleControls", () => {
  let editorState

  beforeEach(() => {
    editorState= EditorState.createEmpty()
  })

  it("Should render block style control", () => {
    const component = shallow(<InlineStyleControls editorState={editorState} />);
  
    expect(component).toMatchSnapshot();
  });
});