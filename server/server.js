//import packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const expensesRoutes = require('./routes/expensesRoutes');
const userRoutes = require('./routes/userRoutes');

//initialise express app
const app = express();

//port and DB variables - imported from .env file
const port = process.env.PORT;
const db = process.env.DB || 'mongodb://localhost:27017';

//middleware
app.use(express.json());
app.use(cors());
mongoose.set('strictQuery', true);

//routes
app.use('/api/expenses', expensesRoutes);
app.use('/api/user', userRoutes);

//connect to DB and start server
mongoose
  .connect(db)
  .then(() => {
    app.listen(port, () =>
      console.log(`Connected to MongoDB, server running on port ${port}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
