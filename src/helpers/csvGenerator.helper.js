const fs = require('fs-extra');
const path = require('path');
const fastCsv = require('fast-csv');
const { logger } = require('../utils/logger.util');
const config = require('../config/app.config');

/**
 * Generate a CSV file from provided data
 * @param {Array} data - Array of objects to convert to CSV
 * @returns {Promise<string>} - Path to the generated CSV file
 */
const generateCsv = async (data) => {
  try {
    await fs.ensureDir(config.csv.directory);
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${config.csv.filename}-${timestamp}.csv`;
    const filePath = path.join(config.csv.directory, filename);
    
    logger.info(`Generating CSV file: ${filePath}`);
    
    return new Promise((resolve, reject) => {
      const writableStream = fs.createWriteStream(filePath);
      
      const csvStream = fastCsv.format({ headers: true });
      csvStream.pipe(writableStream);
      
      data.forEach(row => {
        csvStream.write(row);
      });
      
      csvStream.end();
      
      writableStream.on('finish', () => {
        logger.info(`CSV file generated successfully at: ${filePath}`);
        resolve(filePath);
      });
      
      writableStream.on('error', (error) => {
        logger.error(`Error writing CSV file: ${error.message}`);
        reject(new Error(`Failed to generate CSV file: ${error.message}`));
      });
    });
  } catch (error) {
    logger.error(`Error in CSV generation: ${error.message}`);
    throw new Error(`Failed to generate CSV: ${error.message}`);
  }
};

module.exports = {
  generateCsv
};