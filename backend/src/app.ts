import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' assert { type: "json" };
import bodyParser from 'body-parser';
var app = express();

// Importing the routes //
import indexRouter from './routes/procedures_route.js';
//////////////////////////

// middleware //
    app.use(cors());
    app.use(
      '/api-docs',
      swaggerUi.serve, 
      swaggerUi.setup(swaggerDocument)
    );
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

////////////////

// Routing //

app.use('/', indexRouter);
/////////////

export default app;
