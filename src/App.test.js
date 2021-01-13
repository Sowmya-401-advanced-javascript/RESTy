import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from './App';

test('submitting form will render data in output area', () => {
  render(<App />);
  const formElement = screen.getByTestId('get-poke-form');
  fireEvent.submit(formElement);
  // expect
});
