
module.exports = {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development',
    api: {
      users: 'https://jsonplaceholder.typicode.com/users',
      posts: 'https://jsonplaceholder.typicode.com/posts',
      comments: 'https://jsonplaceholder.typicode.com/comments'
    },
    csv: {
      directory: process.env.CSV_DIRECTORY || './data',
      filename: 'api-data'
    },
    timeout: 10000
  };