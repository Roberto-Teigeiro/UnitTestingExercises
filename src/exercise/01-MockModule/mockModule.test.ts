/* Mock Modules */

/* Mock the function using jest.mock() and jest.fn().
Write four tests inside a describe block. Do not forget to use the beforeEach function to clear the mock function.
Mock the functions in the utils files, they are being used in the convertCase function.
Set up the mock functions before each test.

1. Test cases for the reverseString function
2. Test cases for the toLowerCase function
3. Test cases for the toUpperCase function
4. Test cases for the default case when it is unknown
5. Test cases for the empty string
*/
/* Mock Modules */

/* Mock Modules */

import { convertCase } from "./convertCase";
import * as utils from "./utils";

// Mock the entire utils module
jest.mock("./utils", () => ({
  reverseString: jest.fn(),
  toLowerCase: jest.fn(),
  toUpperCase: jest.fn(),
}));

describe("convertCase function", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("reverseString function", () => {
    it("should call reverseString with the correct argument", () => {
      // Set up the mock to return a specific value
      (utils.reverseString as jest.Mock).mockReturnValue("tset");
      
      // Call the function we're testing
      const result = convertCase("test", "reverse");
      
      // Assert that the mock was called with the right arguments
      expect(utils.reverseString).toHaveBeenCalledWith("test");
      expect(utils.reverseString).toHaveBeenCalledTimes(1);
      expect(result).toBe("tset");
    });

    it("should handle empty string for reverseString", () => {
      (utils.reverseString as jest.Mock).mockReturnValue("");
      
      const result = convertCase("", "reverse");
      
      expect(utils.reverseString).toHaveBeenCalledWith("");
      expect(result).toBe("");
    });
  });

  describe("toLowerCase function", () => {
    it("should call toLowerCase with the correct argument", () => {
      (utils.toLowerCase as jest.Mock).mockReturnValue("hello");
      
      const result = convertCase("HELLO", "lower");
      
      expect(utils.toLowerCase).toHaveBeenCalledWith("HELLO");
      expect(utils.toLowerCase).toHaveBeenCalledTimes(1);
      expect(result).toBe("hello");
    });

    it("should handle empty string for toLowerCase", () => {
      (utils.toLowerCase as jest.Mock).mockReturnValue("");
      
      const result = convertCase("", "lower");
      
      expect(utils.toLowerCase).toHaveBeenCalledWith("");
      expect(result).toBe("");
    });
  });

  describe("toUpperCase function", () => {
    it("should call toUpperCase with the correct argument", () => {
      (utils.toUpperCase as jest.Mock).mockReturnValue("HELLO");
      
      const result = convertCase("hello", "upper");
      
      expect(utils.toUpperCase).toHaveBeenCalledWith("hello");
      expect(utils.toUpperCase).toHaveBeenCalledTimes(1);
      expect(result).toBe("HELLO");
    });

    it("should handle empty string for toUpperCase", () => {
      (utils.toUpperCase as jest.Mock).mockReturnValue("");
      
      const result = convertCase("", "upper");
      
      expect(utils.toUpperCase).toHaveBeenCalledWith("");
      expect(result).toBe("");
    });
  });

  describe("default case", () => {
    it("should return original string when case type is unknown", () => {
      const result = convertCase("test", "unknown");
      
      // Ensure none of the util functions were called
      expect(utils.reverseString).not.toHaveBeenCalled();
      expect(utils.toLowerCase).not.toHaveBeenCalled();
      expect(utils.toUpperCase).not.toHaveBeenCalled();
      expect(result).toBe("test");
    });

    it("should handle empty string for unknown case", () => {
      const result = convertCase("", "unknown");
      
      expect(utils.reverseString).not.toHaveBeenCalled();
      expect(utils.toLowerCase).not.toHaveBeenCalled();
      expect(utils.toUpperCase).not.toHaveBeenCalled();
      expect(result).toBe("");
    });
  });
});