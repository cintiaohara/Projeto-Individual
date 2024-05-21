const result = require("./result");

test("get the final result depending on the counts of A, B, C, and D", () => {
  expect(result(3, 2, 1, 4)).toBe("You're in category D");
  expect(result(5, 5, 5, 5)).toBe("You're in category A"); // assuming ties are resolved by order A, B, C, D
  expect(result(0, 0, 10, 0)).toBe("You're in category C");
  expect(result(3, 7, 2, 1)).toBe("You're in category B");
});