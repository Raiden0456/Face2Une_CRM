import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: "json" };
import bodyParser from "body-parser";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Importing the routes
import proceduresRouter from "./routes/procedures_route.js";
import usersRouter from "./routes/users_route.js";
import appointmentsRouter from "./routes/appointments_route.js";
import clientsRouter from "./routes/clients_route.js";
import authRouter from "./routes/auth_route.js";
import packagesRouter from "./routes/packages_route.js";
import couponsRouter from "./routes/coupons_route.js";
import certificatesRouter from "./routes/certificates_route.js";
import codeRouter from "./routes/codes_route.js";
import foundUsRouter from "./routes/found_us_route.js";
import scheduleRouter from "./routes/schedule_route.js";
import saloonsRouter from "./routes/saloons_route.js";
import clientsSummaryRouter from "./routes/clientsSummary_route.js";
import sumupRouter from "./routes/sumup_route.js";
import stripeRouter from "./services/stripe.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
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

// Session config
const oneYear = 1000 * 60 * 60 * 24 * 365;
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneYear },
    resave: true,
  })
);

// Routing
app.use("/", proceduresRouter);
app.use("/", usersRouter);
app.use("/", appointmentsRouter);
app.use("/", clientsRouter);
app.use("/", authRouter);
app.use("/", packagesRouter);
app.use("/", couponsRouter);
app.use("/", certificatesRouter);
app.use("/", codeRouter);
app.use("/", foundUsRouter);
app.use("/", scheduleRouter);
app.use("/", saloonsRouter);
app.use("/", clientsSummaryRouter);
app.use("/", sumupRouter);
app.use("/", stripeRouter);

// Production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve("./dist", "src", "public", "build")));
  app.get("/*", (req, res) => {
    res.sendFile(
      path.resolve("./dist", "src", "public", "build", "index.html")
    );
  });
}

export default app;
