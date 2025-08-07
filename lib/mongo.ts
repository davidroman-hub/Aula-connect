import { Database, MongoClient } from "mongo/mod.ts";
import "jsr:@std/dotenv/load";

const uri = Deno.env.get("MONGO");
// const uri =
//   "mongodb+srv://t:t@t.sjppuzc.mongodb.net/?retryWrites=true&authMechanism=SCRAM-SHA-1&w=majority&appName=t";
const DB = "t";

let db: Database;

async function createMongoDbConnection() {
  try {
    const client = new MongoClient();
    await client.connect(uri as string);
    console.log(`Mongo db connection established/.... DB : ${DB}`);
    return client.database(DB);
  } catch (error) {
    console.log("error");
    throw new Error(error as any);
  }
}

db = await createMongoDbConnection();

export { createMongoDbConnection, db };
