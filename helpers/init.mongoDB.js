const mongoose = require('mongoose');

mongoose
  .connect(process.env.dblink, {
    dbName: process.env.dbname,
  })
  .then(() => {
    console.log('Connected to MongoDB at port 27017');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB to ${process.env.dbname}`);
});
mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB through app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
});
