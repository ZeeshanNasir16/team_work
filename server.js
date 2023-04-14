const express = require('express');
const app = express();
const cors = require('cors');
const _ = require('dotenv').config();

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const logger = require('./utils/logger');

const GlobalErrorMiddleware = require('./middleware/globalErrorMiddleware');
const AppError = require('./utils/appError');

const userRoutes = require('./route/userRoutes.js');
const roleRoutes = require('./route/roleRoutes.js');

/**********************POST API ************************** */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
        url: `http://${process.env.HOST}:${process.env.PORT}/`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: {
      bearerAuth: [],
    },
  },
  apis: [`./controller/*.js`, `./route/*.js`],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/users', userRoutes);

app.use('/user', roleRoutes);

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
