const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const createError = require('http-errors');

const userRouter = require('./routes/user.routes');
const adminRouter = require('./routes/admin.routes');
const app = express();

//to be able to read json in the req.body
app.use(express.json());

app.use(cookieParser());
//to set security http headers
app.use(helmet());

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

app.use('/users', userRouter);
app.use('/admin', adminRouter);
