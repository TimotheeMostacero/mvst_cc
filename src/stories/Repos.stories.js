import React from 'react';
import Repos from './Repos';

export default {

  title: 'Components/Repos',
  component: Repos,
  argTypes: {
    username: { control: 'text' },
    repos: { control: 'object' },
  },
};

const Template = (args) => <Repos {...args}/>;

export const Default = Template.bind({});
Default.args = {
  username: 'exampleUser',
  repos: [
    {id: 1, name: 'Repo 1', description: 'Description of Repo1', language: 'JavaScript', updated_at: '2024-02-14'},
    {id: 2, name: 'Repo 2', description: 'Description of Repo2', language: 'Python', updated_at: '2024-02-14'},
    {id: 3, name: 'Repo 3', description: 'Description of Repo3', language: 'TypeScript', updated_at: '2024-02-14'},
  ],
};
