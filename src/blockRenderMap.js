import React from "react"
import Typography from "./Typography";
const { Map } = require('immutable')

const blockRenderMap = Map({
  'unstyled': {
    element: 'span',
    wrapper: <Typography component="span" />,
  },
  'paragraph': {
    element: 'span',
    wrapper: <Typography component="span" />,
  },
  'header-one': {
    element: 'span',
    wrapper: <Typography variant="h1" />,
  },
  'header-two': {
    element: 'span',
    wrapper: <Typography variant="h2" />,
  },
  'header-three': {
    element: 'span',
    wrapper: <Typography variant="h3" />,
  },
  'header-four': {
    element: 'span',
    wrapper: <Typography variant="h4" />,
  },
  'header-five': {
    element: 'span',
    wrapper: <Typography variant="h5" />,
  },
  'header-six': {
    element: 'span',
    wrapper: <Typography variant="h6" />,
  },
  'blockquote': {
    element: 'span',
    wrapper: <Typography component="blockquote" />,
  },
  'ordered-list-item': {
    element: 'li',
    wrapper: <Typography component="ol" />,
  }
});

export default blockRenderMap