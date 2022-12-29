import { MongoMemoryServer } from "mongodb-memory-server"
import { Db, MongoClient } from "mongodb"

let database: Db | null = null

export async function startDatabase() {
  const mongo = await MongoMemoryServer.create()
  const mongoDBUrl = await mongo.getUri()
  const conn = await MongoClient.connect(mongoDBUrl)
  database = conn.db()
}

export async function getDB() {
  if (!database) await startDatabase()
  return database
}
