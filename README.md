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

```js
  blockStyleControls: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf("paragraph", "blockquote", "header-one", "header-two", "header-three", "header-four", "header-five", "header-six")
  ])

  defaultProps = {
    blockStyleControls: true
  }
```

Specifying a `boolean` will completely show / hide the controls altogether.

Specifying an `array` allows to only include what is passed in the dropdown. So passing `["paragraph", "header-one"]` will only render the `paragraph` and `h1` block styles as options in the dropdown

## Development

`yarn start`

Make changes to `src/app.js` for testing, `webpack-dev-server` is run at `localhost:4400`

Run tests with `yarn test`

## ToDo

- [ ] Color picker
- [ ] Image controls
- [ ] Support for custom controls
- [ ] support for additional draft.js plugins

PR's welcome!