import createError from "http-errors";
import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: "json" };
import bodyParser from "body-parser";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
var app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Importing the routes //
import ProceduresRouter from './routes/procedures_route.js';
import UsersRouter from './routes/users_route.js';
import AppointmentsRouter from './routes/appointments_route.js';
import ClientsRouter from './routes/clients_route.js';
import AuthRouter from './routes/auth_route.js';
import PackagesRouter from './routes/packages_route.js';
import CouponsRouter from './routes/coupons_route.js';
import CertificatesRouter from './routes/certificates_route.js';
import CodeRouter from './routes/codes_route.js';
import Found_usRouter from './routes/found_us_route.js';
import dotenv from "dotenv";
///////////////////////////

// middleware //
// CORS with cookies //

app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN ||
      "https://" + process.env.HEROKU_APP_NAME + ".herokuapp.com",
    credentials: true,
  })
);
if (process.env.NODE_ENV === "development") {
  swaggerDocument.host = process.env.SWAGGER_HOST;
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Конфиг сессии //
let oneYear = 1000 * 60 * 60 * 24 * 365;
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneYear },
    resave: true,
  })
);

////////////////

// Routing //
app.use('/', ProceduresRouter);
app.use('/', UsersRouter);
app.use('/', AppointmentsRouter);
app.use('/', ClientsRouter);
app.use('/', AuthRouter);
app.use('/', PackagesRouter);
app.use('/', CouponsRouter);
app.use('/', CertificatesRouter);
app.use('/', CodeRouter);
app.use('/', Found_usRouter);
// production mode //
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve("./dist", "src", "public", "build")));
  app.get("/*", (req, res) => {
    res.sendFile(
      path.resolve("./dist", "src", "public", "build", "index.html")
    );
  });
}
/////////////////////

export default app;
