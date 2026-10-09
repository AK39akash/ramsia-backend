
import 'dotenv/config';
import dns from 'node:dns';

dns.setDefaultResultOrder('ipv4first');

import app from './app.js';
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

const PORT = process.env.PORT || 4000;

async function startServer() {
  await connectDb();
  await connectCloudinary();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Server startup failed:', error);
  process.exit(1);
});
