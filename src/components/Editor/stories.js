import React from 'react';
// Import the storybook libraries
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// Import our component from this folder
import Editor from './index';

storiesOf('Editor')
	.add('Basic', () => (
		<Editor
			onChange={state => action(state)}
		/>
	))
