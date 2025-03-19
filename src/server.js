const express = require('express');
const dotenv = require('dotenv');
const { logger } = require('./utils/logger.util');
const errorHandler = require('./middleware/errorHandler.middleware');
const csvRoutes = require('./routes/csv.routes');
const config = require('./config/app.config');


dotenv.config();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', csvRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API to CSV Generator' });
});


app.use(errorHandler);


app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


const PORT = config.port || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`, { stack: err.stack });
  process.exit(1);
});

module.exports = app;   