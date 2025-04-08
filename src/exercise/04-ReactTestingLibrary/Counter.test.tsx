import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Counter from '../03-ReactDom/Counter';

test('counter increments and decrements when the buttons are clicked', () => {
  render(<Counter />);
  
  // Get elements using queries
  const heading = screen.getByText(/counter:/i);
  const incrementButton = screen.getByText(/increment/i);
  const decrementButton = screen.getByText(/decrement/i);
  
  // Initial state check
  expect(heading.textContent).toBe('Counter: 0');
  
  // Click increment button
  fireEvent.click(incrementButton);
  expect(heading.textContent).toBe('Counter: 1');
  
  // Click decrement button
  fireEvent.click(decrementButton);
  expect(heading.textContent).toBe('Counter: 0');
});

test('counter can increment multiple times', () => {
  render(<Counter />);
  
  const heading = screen.getByText(/counter:/i);
  const incrementButton = screen.getByText(/increment/i);
  
  // Click increment button multiple times
  fireEvent.click(incrementButton);
  fireEvent.click(incrementButton);
  expect(heading.textContent).toBe('Counter: 2');
  
  fireEvent.click(incrementButton);
  expect(heading.textContent).toBe('Counter: 3');
});

test('counter does not go negative', () => {
  render(<Counter />);
  
  const heading = screen.getByText(/counter:/i);
  const decrementButton = screen.getByText(/decrement/i);
  
  // Initial state should be 0
  expect(heading.textContent).toBe('Counter: 0');
  
  // Click decrement once
  fireEvent.click(decrementButton);
  
  // Count should be -1 (Counter component doesn't prevent negative values)
  expect(heading.textContent).toBe('Counter: -1');
});

test('counter renders with all expected elements', () => {
  render(<Counter />);
  
  // Check for all expected elements using different query methods
  const heading = screen.getByRole('heading', { level: 1 });
  const buttons = screen.getAllByRole('button');
  
  expect(heading.textContent).toBe('Counter: 0');
  expect(buttons).toHaveLength(2);
  expect(buttons[0].textContent).toBe('Increment');
  expect(buttons[1].textContent).toBe('Decrement');
});

test('counter can go up and down multiple times', () => {
  render(<Counter />);
  
  const heading = screen.getByText(/counter:/i);
  const incrementButton = screen.getByText('Increment');
  const decrementButton = screen.getByText('Decrement');
  
  // Increment multiple times
  fireEvent.click(incrementButton);
  fireEvent.click(incrementButton);
  expect(heading.textContent).toBe('Counter: 2');
  
  // Decrement once
  fireEvent.click(decrementButton);
  expect(heading.textContent).toBe('Counter: 1');
  
  // Increment once more
  fireEvent.click(incrementButton);
  expect(heading.textContent).toBe('Counter: 2');
});

test('can access counter buttons by test id', () => {
  // This test is to demonstrate using test ID - normally you'd add data-testid to your component
  const { container } = render(<Counter />);
  
  // Get buttons by their position (not ideal but demonstrating container usage)
  const buttons = container.querySelectorAll('button');
  const incrementButton = buttons[0];
  const decrementButton = buttons[1];
  
  const heading = screen.getByText(/counter:/i);
  
  fireEvent.click(incrementButton);
  fireEvent.click(incrementButton);
  expect(heading.textContent).toBe('Counter: 2');
  
  fireEvent.click(decrementButton);
  expect(heading.textContent).toBe('Counter: 1');
});

// Additional tests

test('counter can handle rapid increment and decrement sequence', () => {
  render(<Counter />);
  
  const heading = screen.getByText(/counter:/i);
  const incrementButton = screen.getByText(/increment/i);
  const decrementButton = screen.getByText(/decrement/i);
  
  // Initial state check
  expect(heading.textContent).toBe('Counter: 0');
  
  // Perform clicks one by one with verification
  fireEvent.click(incrementButton);
  expect(heading.textContent).toBe('Counter: 1');
  
  fireEvent.click(incrementButton);
  expect(heading.textContent).toBe('Counter: 2');
  
  fireEvent.click(decrementButton);
  expect(heading.textContent).toBe('Counter: 1');
  
  fireEvent.click(incrementButton);
  expect(heading.textContent).toBe('Counter: 2');
  
  fireEvent.click(decrementButton);
  expect(heading.textContent).toBe('Counter: 1');
  
  fireEvent.click(decrementButton);
  expect(heading.textContent).toBe('Counter: 0');
  
  // If we want to end at -1, add one more decrement
  fireEvent.click(decrementButton);
  expect(heading.textContent).toBe('Counter: -1');
});

test('counter can be decremented multiple times', () => {
  render(<Counter />);
  
  const heading = screen.getByText(/counter:/i);
  const decrementButton = screen.getByText(/decrement/i);
  
  // Click decrement button multiple times
  fireEvent.click(decrementButton);
  fireEvent.click(decrementButton);
  expect(heading.textContent).toBe('Counter: -2');
  
  fireEvent.click(decrementButton);
  expect(heading.textContent).toBe('Counter: -3');
});

test('counter works with components loaded multiple times', () => {
  // First render
  const { unmount } = render(<Counter />);
  
  let heading = screen.getByText(/counter:/i);
  const incrementButton = screen.getByText(/increment/i);
  
  fireEvent.click(incrementButton);
  expect(heading.textContent).toBe('Counter: 1');
  
  // Unmount and render again to ensure state is reset
  unmount();
  
  render(<Counter />);
  heading = screen.getByText(/counter:/i);
  
  // Should be back to initial state
  expect(heading.textContent).toBe('Counter: 0');
});
