import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import axios from 'axios';
import GithubExplorer from '../GithubExplorer';

// Test 1: Rendering and Input Field Presence
test('renders GithubExplorer component with input field', () => {
  render(<GithubExplorer/>);
  
  // Verify that the component renders without crashing
  const inputElement = screen.getByPlaceholderText('Enter GitHub Username');
  expect(inputElement).toBeInTheDocument();
});

// Test 2: Handling Non-Existing User
test('displays error message for non-existing user', async () => {
  // Mocking axios to simulate an error response
  jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('User not found'));

  render(<GithubExplorer/>);
  
  // Perform a search with a non-existing username
  fireEvent.change(screen.getByPlaceholderText('Enter GitHub Username'), {target: {value: 'nonexistentuser'}});
  fireEvent.click(screen.getByText('Search'));

  // Wait for the error message to be displayed
  await waitFor(() => {
    const errorMessage = screen.getByText('User not found');
    expect(errorMessage).toBeInTheDocument();
  });
});

// Test 3: Fetching User Data and Repositories
test('fetches and displays user data and repositories', async () => {
  // Mocking axios to simulate successful responses
  jest.spyOn(axios, 'get')
    .mockResolvedValueOnce({data: {login: 'existinguser'}})
    .mockResolvedValueOnce({data: []}); // Empty array for repositories

  render(<GithubExplorer/>);
  
  // Perform a search with an existing username
  fireEvent.change(screen.getByPlaceholderText('Enter GitHub Username'), {target: {value: 'existinguser'}});
  fireEvent.click(screen.getByText('Search'));

  // Wait for user data and repositories to be displayed
  await waitFor(() => {
    const userData = screen.getByText('existinguser');
    const repositories = screen.getByText('Repositories');
    expect(userData).toBeInTheDocument();
    expect(repositories).toBeInTheDocument();
  });
});

// Test 4: Handling Failed Repository Fetch
test('displays error message for failed repository fetch', async () => {
  // Mocking axios to simulate an error response for repositories
  jest.spyOn(axios, 'get')
    .mockResolvedValueOnce({data: {login: 'existinguser'}})
    .mockRejectedValueOnce(new Error('Failed to fetch repositories'));

  render(<GithubExplorer/>);
  
  // Perform a search with an existing username
  fireEvent.change(screen.getByPlaceholderText('Enter GitHub Username'), {target: {value: 'existinguser'}});
  fireEvent.click(screen.getByText('Search'));

  // Wait for the error message to be displayed
  await waitFor(() => {
    const errorMessage = screen.getByText('Failed to fetch repositories');
    expect(errorMessage).toBeInTheDocument();
  });
});
