const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession =  require('express-session');
const cors = require('cors');
const logger = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const { serviceRoutes } = require('./routes/services');
const { authRoutes } = require('./routes/auth');

dotenv.config();

const { NODE_ENV } = process.env;
const API_PREFIX = '/api';
const PORT = process.env.PORT || 8080;
const loggerMode = NODE_ENV === 'production' ? 'common' : 'dev';

const app = express();

const session = expressSession({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
});



(async () => {
  try {
    await mongoose
      .connect('mongodb+srv://KirillTK:0Gy2azuP6G8x0rz2@cluster0.q5e7ttu.mongodb.net/test');
    console.log('Mongoose up!');
    // require('./initAdminScript');
  } catch (e) {
    console.log('Connection db failed', e);
  }
})();


app.use(logger(loggerMode));
app.use(cookieParser());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(session);
app.use(cors());

app.use(`${API_PREFIX}/`, serviceRoutes);
app.use(`${API_PREFIX}/`, authRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT} port`));