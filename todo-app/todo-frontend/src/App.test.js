import { render, screen } from '@testing-library/react';
import App from './App';

test('renders todos title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Todos/i);
  expect(linkElement).toBeInTheDocument();
});
