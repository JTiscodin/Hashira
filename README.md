# Hashira - Shamir's Secret Sharing Implementation

This project implements Shamir's Secret Sharing algorithm to reconstruct secrets from polynomial points.

## Files

- `index.js` - Main entry point that handles JSON input and outputs the secret
- `utils.js` - Contains all the utility functions for Shamir's Secret Sharing
- `package.json` - Project configuration
- `sample.json` - Example JSON input file
- `testcase2.json` - Complex example JSON input file
- `test.js` - Test script demonstrating usage

## Usage

### Method 1: Using file argument
```bash
node index.js <input-file.json>
```

Example:
```bash
node index.js sample.json
```

### Method 2: Using stdin (pipe input)
```bash
# On Linux/Mac
cat sample.json | node index.js

# On Windows (in command prompt)
type sample.json | node index.js
```

### Method 3: Using the npm script
```bash
npm start < sample.json
```

### Method 4: Using utils.js functions directly
```javascript
const { solveShamirSecretSharing, solveFromFile } = require('./utils');

// From JSON object
const result = solveShamirSecretSharing(jsonData);

// From file
const result = solveFromFile('input.json');
```

## Input Format

The JSON input should follow this structure:

```json
{
    "keys": {
        "n": 4,    // Total number of points available
        "k": 3     // Minimum points needed to reconstruct (polynomial degree + 1)
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
}
```

## Output Format

The program outputs JSON with:

```json
{
    "secret": 3,               // The reconstructed secret
    "points_used": 3,          // Number of points used in calculation
    "polynomial_degree": 2     // Degree of the polynomial
}
```

## Available Functions in utils.js

- `solveShamirSecretSharing(jsonData)` - Main function to solve the secret sharing
- `solveFromFile(filename)` - Read JSON from file and solve
- `convertToDecimal(value, base)` - Convert value from any base to decimal
- `lagrangeInterpolation(points, k)` - Perform Lagrange interpolation

## Testing

Run the test script to verify functionality:
```bash
node test.js
```

This will test both direct JSON object processing and file reading capabilities.
