
import serverless from 'serverless-http';
import app from '../../app.js';
import connectDb from '../../config/mongodb.js';
import connectCloudinary from '../../config/cloudinary.js';

const expressHandler = serverless(app);

let initializationPromise;

async function initialize() {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      await connectDb();
      await connectCloudinary();
    })().catch((error) => {
      initializationPromise = undefined;
      throw error;
    });
  }

  return initializationPromise;
}

export const handler = async (event, context) => {
  try {
    await initialize();
    return await expressHandler(event, context);
  } catch (error) {
    console.error('Backend initialization failed:', error);

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Backend initialization failed'
      })
    };
  }
};
