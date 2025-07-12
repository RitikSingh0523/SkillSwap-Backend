const express = require('express');
const helmet = require('helmet');
const connectDB = require('./src/config/db');
const { errorHandler } = require('./src/middleware/errorHandler');
const usersRoute = require('./src/routes/UsersRoute');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use('/api/skillswap/', usersRoute);

const startServer = async () => {
  try {
    await connectDB(URI);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to the database:', err.message);
    process.exit(1);
  }
};

startServer();
