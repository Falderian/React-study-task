import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'mock-local-storage';

import { PageMain } from 'components/main/main';
import { PageAbout } from 'components/about/about';
import React from 'react';

describe('Main Page', () => {
  it('Renders Main Page component', () => {
    render(<PageMain />);
    expect(screen.queryByText(/Apple iPhone 12/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    const { container } = render(<PageMain />);
    const listItems = container.getElementsByClassName('card');
    expect(listItems.length).toBe(9);
  });
});

test('About us page', () => {
  const page = render(<PageAbout />);
  expect(page.getByText(/2022/i)).toBeInTheDocument();
});

test('Test for localStorage mock', () => {
  localStorage.setItem('inputData', 'aloha');
  const page = render(<PageMain />);
  expect(page.findByText('aloha'));
});
