const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const globalErrorHandler = require('./errorController/error.controller');

const userRouter = require('./routes/user.routes');
const adminRouter = require('./routes/admin.routes');
const ErrorHandler = require('./errorController/error_handler');
const app = express();

//to be able to read json in the req.body
app.use(express.json());

app.use(cookieParser());
//to set security http headers
app.use(helmet());
// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

app.use('/users', userRouter);
app.use('/admin', adminRouter);

app.all('*', (req, res, next) => {
  throw new ErrorHandler(`Can't find ${req.originalUrl} on this server!`, 404);
});

app.use(globalErrorHandler);

module.exports = app;
