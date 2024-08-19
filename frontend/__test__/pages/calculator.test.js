import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CalculatorComponent from './CalculatorComponent';
import request from '../../utils/request';

// Mock the request module
jest.mock('../../utils/request');

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('CalculatorComponent', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify({ balance_cents: 10000 }));
  });

  test('renders the calculator form', () => {
    render(<CalculatorComponent />);
    expect(screen.getByLabelText('First Value')).toBeInTheDocument();
    expect(screen.getByLabelText('Operation')).toBeInTheDocument();
    expect(screen.getByLabelText('Second Value')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Calculate' })).toBeInTheDocument();
  });

  test('disables second value input for square root and random string operations', () => {
    render(<CalculatorComponent />);
    const operationSelect = screen.getByLabelText('Operation');
    const secondValueInput = screen.getByLabelText('Second Value');

    userEvent.selectOptions(operationSelect, 'square_root');
    expect(secondValueInput).toBeDisabled();

    userEvent.selectOptions(operationSelect, 'random_string');
    expect(secondValueInput).toBeDisabled();

    userEvent.selectOptions(operationSelect, 'addition');
    expect(secondValueInput).not.toBeDisabled();
  });

  test('sends calculation request and updates result', async () => {
    request.mockResolvedValue({ result: 10, remainingBalance: 9900 });

    render(<CalculatorComponent />);
    const firstValueInput = screen.getByLabelText('First Value');
    const secondValueInput = screen.getByLabelText('Second Value');
    const calculateButton = screen.getByRole('button', { name: 'Calculate' });

    userEvent.type(firstValueInput, '5');
    userEvent.type(secondValueInput, '5');
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(screen.getByText('Result:')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    expect(request).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'Authorization': expect.any(String),
        }),
      }),
      expect.objectContaining({
        operation: 'addition',
        firstValue: '5',
        secondValue: '5',
      })
    );
  });

  test('updates current balance after calculation', async () => {
    request.mockResolvedValue({ result: 10, remainingBalance: 9900 });

    render(<CalculatorComponent />);
    const calculateButton = screen.getByRole('button', { name: 'Calculate' });

    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(screen.getByText('Balance: $99.00')).toBeInTheDocument();
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      '_authUser',
      JSON.stringify({ balance_cents: 9900 })
    );
  });

  test('handles API error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    request.mockRejectedValue(new Error('API Error'));

    render(<CalculatorComponent />);
    const calculateButton = screen.getByRole('button', { name: 'Calculate' });

    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('API Error');
    });

    consoleErrorSpy.mockRestore();
  });
});
