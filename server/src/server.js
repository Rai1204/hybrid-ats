require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/applications', require('./routes/application'));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> {
  console.log('Mongo connected');
  app.listen(port, ()=> console.log('Server listening', port));
}).catch(err=> {
  console.error(err);
  process.exit(1);
});
