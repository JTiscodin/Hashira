const fs = require('fs');
const { solveShamirSecretSharing } = require('./utils');

function main() {
    try {
        let inputData;
        
        // Check if a file argument is provided
        if (process.argv[2]) {
            // Read from file
            inputData = fs.readFileSync(process.argv[2], 'utf-8');
        } else {
            // Read from stdin
            inputData = fs.readFileSync(0, 'utf-8');
        }
        
        const data = JSON.parse(inputData);
        
        // Process the data using Shamir's Secret Sharing
        const result = solveShamirSecretSharing(data);
        
        // Output the secret as JSON
        console.log(JSON.stringify({
            secret: result.secret,
            points_used: result.points.length,
            polynomial_degree: result.polynomial_degree
        }));
    } catch (error) {
        console.error('Error processing input:', error.message);
        process.exit(1);
    }
}

// Run main function if this file is executed directly
if (require.main === module) {
    main();
}

module.exports = { main };