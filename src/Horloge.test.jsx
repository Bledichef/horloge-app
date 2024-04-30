import React from 'react';
import { render, screen } from '@testing-library/react';
import Horloge from './Horloge';

describe('Horloge component', () => {
  test('renders Horloge component', () => {
    render(<Horloge />);
    const horlogeElement = screen.getByText(/Horloge/i);
    expect(horlogeElement).toBeInTheDocument();
  });

  test('displays current time in New York', () => {
    render(<Horloge />);
    const timeInNewYorkElement = screen.getByText(/Heure à New York/i);
    expect(timeInNewYorkElement).toBeInTheDocument();
  });

  test('displays current time in Paris', () => {
    render(<Horloge />);
    const timeInParisElement = screen.getByText(/Heure à Paris/i);
    expect(timeInParisElement).toBeInTheDocument();
  });

  test('displays current time in Tokyo', () => {
    render(<Horloge />);
    const timeInTokyoElement = screen.getByText(/Heure à Tokyo/i);
    expect(timeInTokyoElement).toBeInTheDocument();
  });

  // test('renders alarm form', () => {
  //   render(<Horloge />);
  //   const alarmFormElement = screen.getByRole('form');
  //   expect(alarmFormElement).toBeInTheDocument();
  // });

  test('renders theme button', () => {
    render(<Horloge />);
    const themeButtonElement = screen.getByRole('button', { name: /Changer de Theme/i });
    expect(themeButtonElement).toBeInTheDocument();
  });
});