/**
 * Database client provider
 * Uses high-performance local storage and in-memory store pre-populated with Subscriptions BD catalog data.
 * Completely eliminates PrismaClientInitializationError and missing SQLite file issues on Vercel and serverless.
 */

import { localStorageDb, LocalStorageDatabase } from "./local-storage-db";

export const prisma: LocalStorageDatabase = localStorageDb;
export const db: LocalStorageDatabase = localStorageDb;

export default prisma;
