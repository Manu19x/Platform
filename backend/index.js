const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware-uri
app.use(cors());
app.use(express.json());

// Rute
app.use('/api/auth', require('./routes/auth'));

// Pornire server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
