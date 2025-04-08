/* Exercise 0: Test the function by using a mock function */

/* Mock the function using jest.fn().
Write four tests inside a describe block. Do not forget to use the beforeEach function to clear the mock function.
The mock function receives a prop of type number. The mocked function adds a 6 to the number.
1. First Test: 
The forEach function should be called 3 times
2. Second Test:
The forEach function should be called with the correct arguments.
3. Third Test:
Test the first argument of the first call to the function was 0 and the result is 6.
Test the first argument of the second call to the function was 1  and the result is 7.
4. Forth Test:
Test the first argument of the third call to the function was 4 and the result is not 9.
*/

import { forEach } from './forEach';

describe('forEach function with mock function', () => {
  let mockCallback: jest.Mock;
  let results: number[] = [];

  beforeEach(() => {
    results = [];
    // Create a mock function that adds 6 to the input and stores the result
    mockCallback = jest.fn(x => {
      const result = x + 6;
      results.push(result);
      return result;
    });
    jest.clearAllMocks();
  });

  test('forEach should call the callback 3 times', () => {
    forEach([0, 1, 4], mockCallback);
    expect(mockCallback).toHaveBeenCalledTimes(3);
  });

  test('forEach should call the callback with correct arguments', () => {
    forEach([0, 1, 4], mockCallback);
    expect(mockCallback).toHaveBeenNthCalledWith(1, 0);
    expect(mockCallback).toHaveBeenNthCalledWith(2, 1);
    expect(mockCallback).toHaveBeenNthCalledWith(3, 4);
  });

  test('forEach should process first and second call correctly', () => {
    forEach([0, 1, 4], mockCallback);
    expect(mockCallback.mock.calls[0][0]).toBe(0);
    expect(results[0]).toBe(6);
    
    expect(mockCallback.mock.calls[1][0]).toBe(1);
    expect(results[1]).toBe(7);
  });

  test('forEach should process third call correctly', () => {
    forEach([0, 1, 4], mockCallback);
    expect(mockCallback.mock.calls[2][0]).toBe(4);
    expect(results[2]).not.toBe(9);
    expect(results[2]).toBe(10); // 4 + 6 = 10
  });
});