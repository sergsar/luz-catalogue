import { MongoClient, MongoClientOptions } from "mongodb";
import process from "process";

// https://stackoverflow.com/questions/77974938/next-js-mongodb-too-many-active-connections
// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb/lib/mongodb.ts

if (!process.env.MONGO_CONNECTION) {
  throw new Error('Invalid/Missing environment variable: "MONGO_CONNECTION"');
}

const uri = process.env.MONGO_CONNECTION;
const options: MongoClientOptions = { appName: "luz.catalogue" };
const isProduction = process.env.NODE_ENV === "production";

let client: MongoClient;

// In development mode, use a global variable so that the value
// is preserved across module reloads caused by HMR (Hot Module Replacement).
const symbol = Symbol.for("mongo-client");
const holder = global as unknown as { [key: symbol]: MongoClient };
client = holder[symbol];
if (!client) {
  client = new MongoClient(uri, options);
}

if (!isProduction) {
  holder[symbol] = client;
}

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.

export default client;
