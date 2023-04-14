//import packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const expensesRoutes = require('./routes/expensesRoutes');

//initialise express app
const app = express();

//port and DB variables - imported from .env file
const port = process.env.PORT || 5000;
const db = process.env.DB || 'mongodb://localhost:27017';

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/expenses', expensesRoutes);

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
