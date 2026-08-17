const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

// Serverless functions can be re-invoked on a warm instance, so the connection
// is cached and reused instead of opening a new one on every request.
let cached = global.mongooseConn;

if (!cached) {
  cached = global.mongooseConn = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(`${process.env.MONGODB_URI}/gateugcnetdata`)
      .then((mongooseInstance) => {
        console.log("MongoDB connected...");
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB connection failed ❌", error.message);
    throw error;
  }

  return cached.conn;
};

module.exports = connectDB;
