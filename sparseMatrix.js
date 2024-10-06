const fs = require('fs');

// File path to your input file 
const filePath = '../../sample_inputs/matrix_data.txt';

// Function to read and parse the sparse matrix
function readSparseMatrix(filePath) {
    // Read the file contents
    const data = fs.readFileSync(filePath, 'utf8');

    // Separate the file content into lines
    const lines = data.split('\n');

    // Extraction of the number of rows and columns
    const rows = parseInt(lines[0].split('=')[1]);
    const cols = parseInt(lines[1].split('=')[1]);

    // Create an empty object to store non-zero values
    const sparseMatrix = {};

    // Parse each line from the 3rd line onward (non-zero values)
    for (let i = 2; i < lines.length; i++) {
        if (lines[i].trim() !== '') {

            // Extract row, column and value from each tuple
            const match = lines[i].match(/\((\d+),\s*(\d+),\s*(-?\d+)\)/);
            if (match) {
                const row = parseInt(match[1]);
                const col = parseInt(match[2]);
                const value = parseInt(match[3]);

                // Store the value in the sparseMatrix object

                if (!sparseMatrix[row]) {
                    sparseMatrix[row] = {};
                }
                sparseMatrix[row][col] = value;
            }
        }
    }
    // Return the parsed sparse matrix
    return {
        rows: rows,
        cols: cols,
        matrix: sparseMatrix
    };
}
// Read and print the sparse matrix
const sparseMatrixData = readSparseMatrix(filePath);
console.log(sparseMatrixData);
