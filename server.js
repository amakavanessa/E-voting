const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seeder = require('./extras/seeder');
dotenv.config({ path: './config.env' });
const app = require('./app');
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

seeder.createSuperAdmin();
