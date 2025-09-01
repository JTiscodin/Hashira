// Shamir's Secret Sharing - Polynomial Reconstruction
const fs = require("fs");

// Function to convert a number from any base to decimal
function convertToDecimal(value, base) {
  return BigInt(parseInt(value, base));
}

// Lagrange interpolation to find polynomial coefficients using BigInt for precision
function lagrangeInterpolation(points, k) {
  // We only need k points to reconstruct the polynomial
  const selectedPoints = points.slice(0, k);

  // Calculate the constant term (secret) using Lagrange interpolation
  let secret = BigInt(0);

  for (let i = 0; i < selectedPoints.length; i++) {
    let xi = BigInt(selectedPoints[i].x);
    let yi = selectedPoints[i].y;

    // Calculate Lagrange basis polynomial Li(0)
    let numerator = BigInt(1);
    let denominator = BigInt(1);
    
    for (let j = 0; j < selectedPoints.length; j++) {
      if (i !== j) {
        let xj = BigInt(selectedPoints[j].x);
        numerator = numerator * (BigInt(0) - xj);
        denominator = denominator * (xi - xj);
      }
    }

    // Add this term to the secret
    secret += (yi * numerator) / denominator;
  }

  return secret.toString();
}

// Function to solve the polynomial reconstruction problem
function solveShamirSecretSharing(jsonData) {
  const data = typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;

  const n = data.keys.n; // Total number of points
  const k = data.keys.k; // Minimum points needed (degree + 1)

  // Extract and convert points
  const points = [];

  for (let i = 1; i <= n; i++) {
    if (data[i.toString()]) {
      const point = data[i.toString()];
      const x = i;
      const y = convertToDecimal(point.value, parseInt(point.base));

      points.push({ x, y });
    }
  }

  // Use Lagrange interpolation to find the secret (constant term)
  const secret = lagrangeInterpolation(points, k);

  return {
    points: points,
    secret: secret,
    polynomial_degree: k - 1,
  };
}

// Optional: Function to read from JSON file
function solveFromFile(filename) {
  try {
    const fileData = fs.readFileSync(filename, "utf8");
    const jsonData = JSON.parse(fileData);
    return solveShamirSecretSharing(jsonData);
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error.message);
    return null;
  }
}

// Export functions for use
module.exports = {
  solveShamirSecretSharing,
  solveFromFile,
  convertToDecimal,
  lagrangeInterpolation,
};
