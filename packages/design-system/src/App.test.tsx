import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders hello headline', () => {
  const { getByText } = render(<App />);
  const h1Element = getByText(/Hello/i);
  expect(h1Element).toBeInTheDocument();
});
