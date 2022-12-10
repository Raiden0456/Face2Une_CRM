import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
var app = express();

// enable cors for localhost //
app.use(cors());

/////////////////////////////

// Importing the routes //
import indexRouter from './routes/index_route.js';

//import registerRouter from './routes/register_route.js';

app.use('/', indexRouter);

//app.use('/register', registerRouter);
//////////////////////////

// // view engine setup //
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// ///////////////////////


// app.use(logger('dev')); //
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname + 'views')));
/////////////////////////////



// catch 404 and forward to error handler //
app.use(function(req, res, next) {
  next(createError(404));
});
///////////////////////////////////////////

// error handler //
app.use(function(err, req, res, next) {
  // set locals, only providing error in development //
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  /////////////////////////////////////////////////////

  // render the error page //
  res.status(err.status || 500);
  res.render('pages/error');
  ///////////////////////////
});
///////////////////
export default app;
