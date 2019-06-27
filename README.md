# Material-UI-RTE

## Description

A rich text editor build with Draft.js and Material UI

## Installation

`yarn add material-ui-rte`

## Example

Filling this out later

## API

### Editor Props

Currently, all controls follow this property setup unless otherwise specified...

Specifying a `boolean` will completely show / hide the controls altogether.

Specifying an `array` will only show the buttons / menu items that were passed in.

#### Block styles (headings, paragraph, etc.)

```js
  blockStyleControls: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf("paragraph", "blockquote", "header-one", "header-two", "header-three", "header-four", "header-five", "header-six")
  ])

  defaultProps = {
    blockStyleControls: true
  }
```

#### Divider

```js
  dividerControl: PropTypes.bool

  defaultProps = {
    dividerControl: true
  }
```

The Divider Control does not accept an array value since it's only one button :grin:

#### Inline Style Controls (bold, italic, underline)

```js
  inlineStyleControls: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf("bold", "italic", "underline")
  ])

  defaultProps = {
    inlineStyleControls: true
  }
```

#### List Controls

```js
  listControls: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf("ordered-list", "unordered-list")
  ])

  defaultProps = {
    listControls: true
  }
```

#### List Controls

```js
  alignmentControls: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf("left", "center", "right")
  ])

  defaultProps = {
    alignmentControls: true
  }
```

## Development

`yarn start`

Make changes to `src/app.js` for testing, `webpack-dev-server` is run at `localhost:4400`

Run tests with `yarn test`

## ToDo

- [ ] Move docs to Docz
- [ ] Setup live pages for storybook and docz
- [ ] Color picker
- [ ] Image controls
- [ ] Support for custom controls
- [ ] support for additional draft.js plugins
- [ ] support for plain text and html as initial values

PR's welcome!