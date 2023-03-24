require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const TaskRouter = require('./routes/TaskRoutes');
const UserRouter = require('./routes/UserRouter');
const port = process.env.PORT || 3008;

const app = express();
app.use(express.json());

app.use('/api/tasks', TaskRouter);
app.use('/api/user', UserRouter);

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch(error => {
    console.log(error);
  });

