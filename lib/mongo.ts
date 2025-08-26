import { Database, MongoClient } from "mongo/mod.ts";
import "jsr:@std/dotenv/load";

const uri = Deno.env.get("MONGO");
const DB = Deno.env.get("MONGO_DB_NAME") || "t";

async function createMongoDbConnection(): Promise<Database> {
  if (!uri) {
    throw new Error("MONGO environment variable is not set");
  }

  try {
    const client = new MongoClient();
    await client.connect(uri);
    console.log(`MongoDB connection established successfully. DB: ${DB}`);
    return client.database(DB);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error(`MongoDB connection failed: ${error}`);
  }
}

// Initialize connection with error handling
let database: Database | null = null;
try {
  database = await createMongoDbConnection();
} catch (error) {
  console.error("Failed to initialize MongoDB connection:", error);
  console.log("The application will continue without database functionality");
}

export const db = database;
export const usersCollection = database?.collection("users");

export { createMongoDbConnection };
