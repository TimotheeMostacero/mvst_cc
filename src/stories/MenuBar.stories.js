import React from 'react';
import {storiesOf} from '@storybook/react';
import MenuBar from '../components/menuBar/MenuBar.jsx';

storiesOf('MenuBar', module)
  .add('Default', () => (
    <MenuBar repoCount={10} />
));