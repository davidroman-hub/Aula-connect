import { Database, MongoClient } from "mongo/mod.ts";
import "jsr:@std/dotenv/load";

const uri = Deno.env.get("MONGO");
const DB = "t";

let db: Database;

async function createMongoDbConnection() {
  try {
    const client = new MongoClient();
    await client.connect(uri as string);
    console.log(`Mongo db URI/.... DB : ${uri}`);
    console.log(`Mongo db connection established/.... DB : ${DB}`);
    return client.database(DB);
  } catch (error) {
    console.log("error");
    console.log(`Mongo db URI/.... DB : ${uri}`);
    throw new Error(error as any);
  }
}

db = await createMongoDbConnection();

export { createMongoDbConnection, db };
