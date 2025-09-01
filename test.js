const { solveShamirSecretSharing, solveFromFile } = require("./utils");

// Test with direct JSON object
const testData = {
  keys: {
    n: 4,
    k: 3,
  },
  1: {
    base: "10",
    value: "4",
  },
  2: {
    base: "2",
    value: "111",
  },
  3: {
    base: "10",
    value: "12",
  },
  6: {
    base: "4",
    value: "213",
  },
};

console.log("=== Testing direct JSON object ===");
const result1 = solveShamirSecretSharing(testData);
console.log("Secret found:", result1.secret);
console.log("Points used:", result1.points.length);
console.log("Polynomial degree:", result1.polynomial_degree);

console.log("\n=== Testing file reading ===");
const result2 = solveFromFile("sample.json");
if (result2) {
  console.log("Secret found:", result2.secret);
  console.log("Points used:", result2.points.length);
  console.log("Polynomial degree:", result2.polynomial_degree);
}
