import { forEach } from './forEach';

describe('forEach function with spyOn', () => {
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