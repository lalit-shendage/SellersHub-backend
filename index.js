// index.js
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sellerRoutes = require('./routes/sellerRoutes');
const productRoutes = require('./routes/productRoutes');
const database = require('./config/database');

database();

app.use(cors());
// Parse incoming request bodies
app.use(bodyParser.json());

// Routes
app.use('/api/sellers', sellerRoutes);
app.use('/api/products', productRoutes);

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});

