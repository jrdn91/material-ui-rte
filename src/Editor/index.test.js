import React from "react"
import Editor from "./index"
import renderer from "react-test-renderer"

test('Editor renders', () => {
  const component = renderer.create(
    <Editor />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});