import React from 'react';
import GithubExplorer from '../components/GithubExplorer';

export default {
  title: 'Components/GithubExplorer',
  component: GithubExplorer,
};

const Template = (args) => <GithubExplorer {...args}/>;

export const Default = Template.bind({});
Default.args = {
  username: 'TimotheeMostacero'
};
