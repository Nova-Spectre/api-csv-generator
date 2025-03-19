const asyncHandler = require('express-async-handler');
const apiService = require('../services/api.service');
const csvGenerator = require('../helpers/csvGenerator.helper');
const { logger } = require('../utils/logger.util');
const config = require('../config/app.config');

/**
 * Generate CSV from multiple API endpoints
 * @route   GET /api/generate-csv
 * @access  Public
 */
const generateCsv = asyncHandler(async (req, res) => {
  logger.info('Starting CSV generation process');
  
  try {
    const [users, posts, comments] = await Promise.all([
      apiService.fetchUsers(),
      apiService.fetchPosts(),
      apiService.fetchComments()
    ]);
    
    logger.info(`Data fetched: Users: ${users.length}, Posts: ${posts.length}, Comments: ${comments.length}`);
    
    const userData = {};
    const postData = {};
    const commentData = {};
      
    users.forEach(user => {
      userData[user.id] = user.name;
    });
    
    // Map posts by ID
    posts.forEach(post => {
      postData[post.id] = post.title;
    });
    
    comments.forEach(comment => {
      commentData[comment.id] = comment.body;
    });

    const combinedData = [];
    
    const maxId = Math.max(
      ...Object.keys(userData).map(Number),
      ...Object.keys(postData).map(Number),
      ...Object.keys(commentData).map(Number)
    );
    
    for (let id = 1; id <= maxId; id++) {
      combinedData.push({
        name: userData[id] || '', 
        title: postData[id] || '',
        body: commentData[id] || ''
      });
    }
    
    logger.info(`Combined ${combinedData.length} records for CSV generation`);
    
    const csvFilePath = await csvGenerator.generateCsv(combinedData);
    
    res.status(200).json({
      success: true,
      message: 'CSV generated successfully',
      filePath: csvFilePath
    });
  } catch (error) {
    logger.error(`CSV generation failed: ${error.message}`, { stack: error.stack });
    res.status(500).json({
      success: false,
      message: 'Failed to generate CSV',
      error: error.message
    });
  }
});

module.exports = {
  generateCsv
};