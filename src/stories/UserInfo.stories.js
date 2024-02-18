import React from 'react';
import UserInfo from './UserInfo';

export default {
    
  title: 'Components/UserInfo',
  component: UserInfo,
  argTypes: {
    username: {control: 'text'},
    userData: {control: 'object'},
  },
};

const Template = (args) => <UserInfo {...args}/>;

export const Default = Template.bind({});
Default.args = {
  username: 'exampleUser',
  userData: {
    avatar_url: 'https://example.com',
    name: 'John Doe',
    login: 'johndoe',
    bio: 'Software Engineer',
    followers: 100,
    following: 50,
    public_repos: 30,
    email: 'johndoe@example.com',
  },
};
