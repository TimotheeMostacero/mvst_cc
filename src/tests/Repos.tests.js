import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Repos from './Repos';

describe('Repos Component Tests', () => {
  // Test 1: Renders Repos component without crashing
  test('renders Repos component without crashing', () => {
    render(<Repos />);
  });

  // Test 2: Filters repositories based on search input
  test('filters repositories based on search input', () => {
    const repos = [
      {id: 1, name: 'Repo1', description: 'Description1', language: 'JavaScript'},
      {id: 2, name: 'Repo2', description: 'Description2', language: 'Python'}
    ];
    const { getByPlaceholderText, getByText } = render(<Repos repos={repos}/>);
    const searchInput = getByPlaceholderText('Find a repository...');

    fireEvent.change(searchInput, {target: {value: 'Repo1'}});

    expect(getByText('Repo1')).toBeInTheDocument();
    expect(getByText('Repo2')).not.toBeInTheDocument();
  });

  // Test 3: Filters repositories based on language selection
  test('filters repositories based on language selection', () => {
    const repos = [
      {id: 1, name: 'Repo1', description: 'Description1', language: 'JavaScript'},
      {id: 2, name: 'Repo2', description: 'Description2', language: 'Python'}
    ];
    const { getByLabelText, getByText } = render(<Repos repos={repos}/>);
    const languageSelect = getByLabelText('Language:');

    fireEvent.change(languageSelect, { target: {value: 'JavaScript'}});

    expect(getByText('Repo1')).toBeInTheDocument();
    expect(getByText('Repo2')).not.toBeInTheDocument();
  });

  // Test 4: Clears filters when "Clear filter" button is clicked
  test('clears filters when "Clear filter" button is clicked', () => {
    const repos = [
      {id: 1, name: 'Repo1', description: 'Description1', language: 'JavaScript'},
      {id: 2, name: 'Repo2', description: 'Description2', language: 'Python'}
    ];
    const { getByText, getByLabelText, queryByText } = render(<Repos repos={repos}/>);
    const searchInput = getByLabelText('Find a repository...');

    fireEvent.change(searchInput, {target: {value: 'Repo1'}});
    fireEvent.click(getByText('Clear filter'));

    expect(queryByText('Repo1')).not.toBeInTheDocument();
    expect(queryByText('Repo2')).not.toBeInTheDocument();
  });
});
