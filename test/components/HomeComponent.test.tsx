import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomeComponent from '../../components/HomeComponent';

test('displays a message', async () => {
  render(<HomeComponent message='Hello World' />);
  expect(screen.getByTestId('home-message')).toHaveTextContent('Hello World');
});
