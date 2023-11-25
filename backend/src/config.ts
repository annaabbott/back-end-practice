// config.js

require('dotenv').config();

 export default {
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY
};

