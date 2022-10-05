const express = require('express');

const app = express();
app.use(express.json());
const userRouter = require('./routes/user.routes');

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

app.use('/users', userRouter);
