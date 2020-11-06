import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LandingPage from '../../pages';

test('displays a message', async () => {
  render(<LandingPage />);
  expect(screen.getByTestId('home-message')).toHaveTextContent('Welcome to the home page of the App');
});
