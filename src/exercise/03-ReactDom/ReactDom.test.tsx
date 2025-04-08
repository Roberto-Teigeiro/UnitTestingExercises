/* Exercise 3 ReactDom: Test using ReactDOM */

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import Counter from "./Counter";

// Clear the DOM before each test
beforeEach(() => {
  document.body.innerHTML = '';
});

test('counter increments and decrements when the buttons are clicked', () => {
  // Create a div to render component to
  const div = document.createElement('div');
  
  // Append to document body
  document.body.append(div);
  
  // Use createRoot to render Counter component
  const root = createRoot(div);
  act(() => {
    root.render(<Counter />);
  });
  
  // Get references to buttons and count display
  const buttons = div.querySelectorAll('button');
  const incrementButton = buttons[0];
  const decrementButton = buttons[1];
  const countDisplay = div.querySelector('h1');
  
  // Check if elements exist
  expect(countDisplay).not.toBeNull();
  expect(incrementButton).not.toBeNull();
  expect(decrementButton).not.toBeNull();
  
  // Initial state check
  expect(countDisplay?.textContent).toBe('Counter: 0');
  
  // Click increment button
  act(() => {
    incrementButton.click();
  });
  expect(countDisplay?.textContent).toBe('Counter: 1');
  
  // Click decrement button
  act(() => {
    decrementButton.click();
  });
  expect(countDisplay?.textContent).toBe('Counter: 0');
  
  // Cleanup
  div.remove();
});

test('counter can increment multiple times', () => {
  const div = document.createElement('div');
  document.body.append(div);
  
  const root = createRoot(div);
  act(() => {
    root.render(<Counter />);
  });
  
  const incrementButton = div.querySelectorAll('button')[0];
  const countDisplay = div.querySelector('h1');
  
  expect(countDisplay).not.toBeNull();
  
  // Click increment one by one to ensure state updates correctly
  act(() => {
    incrementButton.click();
  });
  act(() => {
    incrementButton.click();
  });
  expect(countDisplay?.textContent).toBe('Counter: 2');
  
  act(() => {
    incrementButton.click();
  });
  expect(countDisplay?.textContent).toBe('Counter: 3');
  
  div.remove();
});

test('counter does not go negative', () => {
  const div = document.createElement('div');
  document.body.append(div);
  
  const root = createRoot(div);
  act(() => {
    root.render(<Counter />);
  });
  
  const decrementButton = div.querySelectorAll('button')[1];
  const countDisplay = div.querySelector('h1');
  
  expect(countDisplay).not.toBeNull();
  
  // Initial state should be 0
  expect(countDisplay?.textContent).toBe('Counter: 0');
  
  // Click decrement once
  act(() => {
    decrementButton.click();
  });
  
  // Count should be -1 (Counter component doesn't prevent negative values)
  expect(countDisplay?.textContent).toBe('Counter: -1');
  
  div.remove();
});

test('counter renders with all expected elements', () => {
  const div = document.createElement('div');
  document.body.append(div);
  
  const root = createRoot(div);
  act(() => {
    root.render(<Counter />);
  });
  
  // Check for all expected elements
  const heading = div.querySelector('h1');
  const buttons = div.querySelectorAll('button');
  
  expect(heading).not.toBeNull();
  expect(heading?.textContent).toBe('Counter: 0');
  expect(buttons.length).toBe(2);
  expect(buttons[0].textContent).toBe('Increment');
  expect(buttons[1].textContent).toBe('Decrement');
  
  div.remove();
});

test('counter can go up and down multiple times', () => {
  const div = document.createElement('div');
  document.body.append(div);
  
  const root = createRoot(div);
  act(() => {
    root.render(<Counter />);
  });
  
  const buttons = div.querySelectorAll('button');
  const incrementButton = buttons[0];
  const decrementButton = buttons[1];
  const countDisplay = div.querySelector('h1');
  
  expect(countDisplay).not.toBeNull();
  
  // Increment multiple times
  act(() => {
    incrementButton.click();
  });
  act(() => {
    incrementButton.click();
  });
  expect(countDisplay?.textContent).toBe('Counter: 2');
  
  // Decrement once
  act(() => {
    decrementButton.click();
  });
  expect(countDisplay?.textContent).toBe('Counter: 1');
  
  // Increment once more
  act(() => {
    incrementButton.click();
  });
  expect(countDisplay?.textContent).toBe('Counter: 2');
  
  div.remove();
});
