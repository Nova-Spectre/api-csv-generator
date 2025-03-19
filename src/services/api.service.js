const axios = require('axios');
const config = require('../config/app.config');
const { logger } = require('../utils/logger.util');


const api = axios.create({
  timeout: config.timeout
});

/**
 * Fetch user data from API
 * @returns {Promise<Array>} Array of user objects
 */
const fetchUsers = async () => {
  try {
    logger.info(`Fetching users from: ${config.api.users}`);
    const response = await api.get(config.api.users);
    return response.data;
  } catch (error) {
    logger.error(`Error fetching users: ${error.message}`);
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
};

/**
 * Fetch post data from API
 * @returns {Promise<Array>} Array of post objects
 */
const fetchPosts = async () => {
  try {
    logger.info(`Fetching posts from: ${config.api.posts}`);
    const response = await api.get(config.api.posts);
    return response.data;
  } catch (error) {
    logger.error(`Error fetching posts: ${error.message}`);
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
};

/**
 * Fetch comment data from API
 * @returns {Promise<Array>} Array of comment objects
 */
const fetchComments = async () => {
  try {
    logger.info(`Fetching comments from: ${config.api.comments}`);
    const response = await api.get(config.api.comments);
    return response.data;
  } catch (error) {
    logger.error(`Error fetching comments: ${error.message}`);
    throw new Error(`Failed to fetch comments: ${error.message}`);
  }
};

module.exports = {
  fetchUsers,
  fetchPosts,
  fetchComments
};