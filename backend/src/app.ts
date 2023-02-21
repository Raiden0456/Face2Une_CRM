import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' assert { type: "json" };
import bodyParser from 'body-parser';
import session from 'express-session';
var app = express();

// Importing the routes //
import ProceduresRouter from './routes/procedures_route.js';
import UsersRouter from './routes/users_route.js';
import AppointmentsRouter from './routes/appointments_route.js';
import ClientsRouter from './routes/clients_route.js';
import AuthRouter from './routes/auth_route.js';
import PackagesRouter from './routes/packages_route.js';
import dotenv from "dotenv";
///////////////////////////

// middleware //
    // CORS with cookies //

    app.use(cors(
      {
        origin: process.env.CORS_ORIGIN,
        credentials: true
      }
    ));
    if(process.env.NODE_ENV === 'development') {
      swaggerDocument.host = process.env.SWAGGER_HOST;
      app.use(
        '/api-docs',
        swaggerUi.serve, 
        swaggerUi.setup(swaggerDocument)
      );
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    // Конфиг сессии //
    let oneYear = 1000 * 60 * 60 * 24 * 365;
    app.use(session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: true,
      cookie: { maxAge: oneYear },
      resave: true
  }))

////////////////

// Routing //
app.use('/', ProceduresRouter);
app.use('/', UsersRouter);
app.use('/', AppointmentsRouter);
app.use('/', ClientsRouter);
app.use('/', AuthRouter);
app.use('/', PackagesRouter);
/////////////

export default app;
