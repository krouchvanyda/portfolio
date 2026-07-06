import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the hero heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /hi, i'm/i });
  expect(heading).toBeInTheDocument();
});
