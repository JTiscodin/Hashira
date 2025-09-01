// Shamir's Secret Sharing - Polynomial Reconstruction
const fs = require('fs');

// Function to convert a number from any base to decimal
function convertToDecimal(value, base) {
    return parseInt(value, base);
}

// Lagrange interpolation to find polynomial coefficients
function lagrangeInterpolation(points, k) {
    // We only need k points to reconstruct the polynomial
    const selectedPoints = points.slice(0, k);
    
    // Calculate the constant term (secret) using Lagrange interpolation
    let secret = 0;
    
    for (let i = 0; i < selectedPoints.length; i++) {
        let xi = selectedPoints[i].x;
        let yi = selectedPoints[i].y;
        
        // Calculate Lagrange basis polynomial Li(0)
        let li = 1;
        for (let j = 0; j < selectedPoints.length; j++) {
            if (i !== j) {
                let xj = selectedPoints[j].x;
                li = li * (0 - xj) / (xi - xj);
            }
        }
        
        secret += yi * li;
    }
    
    return Math.round(secret);
}

// Function to solve the polynomial reconstruction problem
function solveShamirSecretSharing(jsonData) {
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    
    const n = data.keys.n;  // Total number of points
    const k = data.keys.k;  // Minimum points needed (degree + 1)
    
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
        polynomial_degree: k - 1
    };
}

// Optional: Function to read from JSON file
function solveFromFile(filename) {
    try {
        const fileData = fs.readFileSync(filename, 'utf8');
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
    lagrangeInterpolation
};