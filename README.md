# Material-UI-RTE

## Description

A rich text editor build with Draft.js and Material UI

## Installation

`yarn add material-ui-rte`

## Example

Filling this out later

## API

### Editor Props

#### Block styles (headings, paragraph, etc.)

Currently, all controls follow this property setup unless otherwise specified...

Specifying a `boolean` will completely show / hide the controls altogether.

Specifying an `array` will only show the buttons / menu items that were passed in.

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

API Coming Soon...

#### Inline Style Controls

API Coming Soon...

#### List Controls

API Coming Soon...

#### Alignment Controls

API Coming Soon...

## Development

`yarn start`

Make changes to `src/app.js` for testing, `webpack-dev-server` is run at `localhost:4400`

Run tests with `yarn test`

## ToDo

- [ ] Color picker
- [ ] Image controls
- [ ] Support for custom controls
- [ ] support for additional draft.js plugins
- [ ] support for plain text and html as initial values

PR's welcome!