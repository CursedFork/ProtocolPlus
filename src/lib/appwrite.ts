import { Client, Account, Databases, Permission, Role, ID, Query } from 'appwrite'

export const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject('6a175007003a8e03aef8')

export const account   = new Account(client)
export const databases = new Databases(client)

export { ID, Query, Permission, Role }

export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID as string

// Collection IDs — must match exactly what you create in the Appwrite dashboard
export const COLLECTIONS = {
  PROFILES:     'profiles',
  WEIGHT_LOG:   'weight_log',
  STRENGTH_LOG: 'strength_log',
  GOALS:        'goals',
  HABIT_LOG:    'habit_log',
  PREFERENCES:  'preferences',
} as const

/**
 * Upsert helper — tries update first, falls back to create.
 * Uses a deterministic docId so the same record is always overwritten.
 */
export async function upsertDocument(
  collectionId: string,
  docId: string,
  data: Record<string, unknown>,
  userId: string,
) {
  const perms = [
    Permission.read(Role.user(userId)),
    Permission.update(Role.user(userId)),
    Permission.delete(Role.user(userId)),
  ]
  try {
    return await databases.updateDocument(DATABASE_ID, collectionId, docId, data)
  } catch {
    return await databases.createDocument(DATABASE_ID, collectionId, docId, data, perms)
  }
}
