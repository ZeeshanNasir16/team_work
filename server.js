const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const GlobalErrorMiddleware = require('./middleware/globalErrorMiddleware');
const AppError = require('./utils/appError');
const userRoutes = require ("./route/userRoutes.js")
const swaggerUi = require('swagger-ui-express');
const logger = require('./utils/logger');
swaggerDocument = require('./swagger/swagger.json');

/**********************POST API ************************** */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

// ^ Routes
app.use('/users', userRoutes)
/***********************************Swagger API Testing******************* */
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//^ handling all unhandled routes
app.all('*', (req, _, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on the server`));
});

// ^ error handling middleware
app.use(GlobalErrorMiddleware);

const port = process.env.port || 5000;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
