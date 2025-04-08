/* Exercise 2: Test using snapshots */

/* Mock the function using jest.fn().
Write three tests inside a describe block. You should use import the superHeros[] and getFlyingSuperHeros function.

1. First Test: 
Test should return an empty array if no superheros have the 'Fly' power"
2. Second Test:
Test should return an array of superHeros that have the 'Fly' power"
3. Third Test:
Test should match the snapshot of flying superheros.
The snapshot file should contain the expected output of the test.
The snapshot should be saved in a __snapshots__ directory next to the test file.
The snapshot file should be named SuperHeros.test.ts.snap.
*/
import { getFlyingSuperHeros } from "./getFlyingSuperHeros";
import { superHeros } from "./superHeros";
import * as flyingHeroModule from "./getFlyingSuperHeros";

jest.mock("./getFlyingSuperHeros", () => {
  const originalModule = jest.requireActual("./getFlyingSuperHeros");
  return {
    ...originalModule,
    getFlyingSuperHeros: jest.fn(originalModule.getFlyingSuperHeros)
  };
});

describe("SuperHeros tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return an empty array if no superheros have the 'Fly' power", () => {
    const mockSuperHeros = [
      { name: "Hulk", power: ["Super Strength", "Regeneration"] },
      { name: "SpiderMan", power: ["Agility", "Spider-Sense"] },
    ];
    
    const result = getFlyingSuperHeros(mockSuperHeros);
    
    expect(result).toEqual([]);
    expect(flyingHeroModule.getFlyingSuperHeros).toHaveBeenCalledTimes(1);
    expect(flyingHeroModule.getFlyingSuperHeros).toHaveBeenCalledWith(mockSuperHeros);
  });

  test("should return an array of superHeros that have the 'Fly' power", () => {
    const result = getFlyingSuperHeros(superHeros);
    
    const expectedHeroes = [
      { name: "Superman", power: ["Fly", "Super Strength"] },
      { name: "IronMan", power: ["Intelligence", "Technology", "Fly", "Billionaire"] },
      { name: "GreenLantern", power: ["Energy Manipulation", "Fly"] },
      {name: "WonderWoman", power: ["Super Strength", "Agility", "Fly"] },
    ];
    
    expect(result).toEqual(expectedHeroes);
    expect(flyingHeroModule.getFlyingSuperHeros).toHaveBeenCalledTimes(1);
    expect(flyingHeroModule.getFlyingSuperHeros).toHaveBeenCalledWith(superHeros);
  });

  test("should match the snapshot of flying superheros", () => {
    const flyingSuperHeros = getFlyingSuperHeros(superHeros);
    
    expect(flyingSuperHeros).toMatchSnapshot();
    expect(flyingHeroModule.getFlyingSuperHeros).toHaveBeenCalledTimes(1);
    expect(flyingHeroModule.getFlyingSuperHeros).toHaveBeenCalledWith(superHeros);
  });
});
