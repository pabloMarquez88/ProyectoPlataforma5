const sequelize = require('./src/model/sequelize.facade')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {router} = require('./src/router');
const app = express();
const mainDBRepository = require('./src/repositories/main.repository');

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Customer API",
            description: "Customer API Information",
            contact: {
                name: "Amazing Developer"
            },
            servers: ["http://localhost:3000"]
        }
    },
    // ['.routes/*.js']
    apis: ["app.js", "../app.js", "router.js", "./src/router.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mainDBRepository.connect();
app.mainDBRepository = mainDBRepository;

// Enable cors for public access
app.use(cors());

// Healthcheck
app.get('/health', (req, res) => {
    res.status(200).end();
});

// JSON parsing
app.use(bodyParser.json());

// Other request types parsing
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// Remove express header
app.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
});

// API requests routing
app.use('/', router);

module.exports = app;
