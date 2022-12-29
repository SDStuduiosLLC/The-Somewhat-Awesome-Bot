import { getDB } from "./mongo"
import { ObjectId } from "mongodb"

const collectionName = "stats"

export async function insertStat(ad: any) {
  const db = await getDB()
  // @ts-ignore
  const { insertedId } = await db?.collection(collectionName).insertOne(ad)
  return insertedId
}

export async function getStats() {
  const db = await getDB()
  return await db?.collection(collectionName).find({}).toArray()
}
