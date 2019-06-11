import React from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const BLOCK_TYPES = [
  {label: 'Paragraph', style: 'paragraph'},
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'}
];

const BlockStyleControl = (props) => {
  // const {editorState} = props;
  // const selection = editorState.getSelection();
  // const blockType = editorState
  //   .getCurrentContent()
  //   .getBlockForKey(selection.getStartKey())
  //   .getType();
  return (
    <FormControl style={{minWidth: 120}}>
      <Select
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
        inputProps={{
          name: 'typography',
          id: 'typography-simple',
        }}
      >
        {BLOCK_TYPES.map(type => (
          <MenuItem key={type.style} value={type.style}>{type.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BlockStyleControl