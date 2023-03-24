const dotenv = require('dotenv').config();

const config = {
  port: process.env.PORT || 3400,
  node_env: process.env.NODE_ENV || 'development',
  jwt_secret: process.env.JWT_SECRET,
  frontend_url:process.env.FRONTEND_URL
};

module.exports = { config };
