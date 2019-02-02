const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./_routes/products');
const userRoutes = require('./_routes/user');

mongoose.connect(
  'mongodb://localhost:27017/myapp', {useNewUrlParser: true}
);

mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if(req.methos === 'OPTIONS') {
      res.header('Access-Control-Allow-Headers', 'PUT, POST, GET, DELETE, PATCH');
      return res.status(200),json({});
  }
  next();
})

//Routes that should handle requests
app.use('/products', productRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;