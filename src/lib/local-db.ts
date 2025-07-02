'use client';
import type { Track } from './types';

const DB_NAME = 'MusicPlayerDB';
const DB_VERSION = 1;
const STORE_NAME = 'tracks';

let db: IDBDatabase;

export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (db) {
      return resolve(db);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('IndexedDB error:', request.error);
      reject('IndexedDB error');
    };

    request.onsuccess = (event) => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

export async function addTrack(file: File): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const track: Omit<Track, 'id'> = {
        title: file.name.split('.').slice(0, -1).join('.'),
        artist: 'Unknown Artist',
        file: file
    }
    const request = store.add(track);

    request.onsuccess = () => {
      resolve();
    };
    request.onerror = () => {
      console.error('Error adding track:', request.error);
      reject('Error adding track');
    };
  });
}

export async function getAllTracks(): Promise<Track[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      // Sort by newest first
      resolve(request.result.reverse());
    };
    request.onerror = () => {
      console.error('Error getting tracks:', request.error);
      reject('Error getting tracks');
    };
  });
}
