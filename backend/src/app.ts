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
    // самый тупой сикрет //
    let oneYear = 1000 * 60 * 60 * 24 * 365;
    app.use(session({
      secret: "KiboVrebaFa2u2023",
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
/////////////

export default app;
