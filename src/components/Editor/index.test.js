import React from "react"
import { createShallow, createMount } from "@material-ui/core/test-utils"
import Editor from "./index"
import DividerControl from "../DividerControl"
import BlockStyleControl from "../BlockStyleControl"
import InlineStyleControls from "../InlineStyleControls"
import ListControls from "../ListControls"
import AlignmentControls from "../AlignmentControls"
import ImageUploadControl from "../ImageUploadControl"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"

const theme = createMuiTheme()

const Wrapped = (props = {}) => (
  <ThemeProvider theme={theme}>
    <Editor {...props} />
  </ThemeProvider>
)

describe("Editor", () => {
  let shallow
  let mount

  beforeAll(() => {
    shallow = createShallow()
    mount = createMount()
  })

  afterAll(() => {
    mount.cleanUp()
  })

  it("Should render alignment control", () => {
    const component = shallow(<Wrapped />)

    expect(component).toMatchSnapshot()
  })

  it("Should not render block style controls when 'blockStyleControls' is set to 'false'", () => {
    const component = mount(<Wrapped blockStyleControls={false} />)

    expect(component.find(BlockStyleControl).exists()).toBe(false)
  })

  it("Should not render divider control when 'dividerControl' is set to 'false'", () => {
    const component = mount(<Wrapped dividerControl={false} />)

    expect(component.find(DividerControl).exists()).toBe(false)
  })

  it("Should not render inline style controls when 'inlineStyleControls' is set to 'false'", () => {
    const component = mount(<Wrapped inlineStyleControls={false} />)

    expect(component.find(InlineStyleControls).exists()).toBe(false)
  })

  it("Should not render list controls when 'listControls' is set to 'false'", () => {
    const component = mount(<Wrapped listControls={false} />)

    expect(component.find(ListControls).exists()).toBe(false)
  })

  it("Should not render alignment controls when 'alignmentControls' is set to 'false'", () => {
    const component = mount(<Wrapped alignmentControls={false} />)

    expect(component.find(AlignmentControls).exists()).toBe(false)
  })

  it("Should not render image upload control when 'imageUploadControl' is set to 'false'", () => {
    const component = mount(<Wrapped imageUploadControl={false} />)

    expect(component.find(ImageUploadControl).exists()).toBe(false)
  })
})
