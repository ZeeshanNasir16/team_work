const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const GlobalErrorMiddleware = require('./middleware/globalErrorMiddleware');
const AppError = require('./utils/appError');

// const swaggerUi = require('swagger-ui-express');
const logger = require('./utils/logger');
// swaggerDocument = require('./swagger/swagger.json');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./route/userRoutes');

/**********************POST API ************************** */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

/***********************************Swagger API Testing******************* */
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'node js api endpoint',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:4000/',
      },
    ],
  },
  apis: [`./controller/userController.js`],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ^ Routes
app.get('/api', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server have received the request',
  });
});

app.use('/users', userRoutes);

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
