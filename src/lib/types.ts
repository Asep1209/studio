import type { Timestamp } from "firebase/firestore";

export interface Track {
  id: string;
  title: string;
  artist?: string;
  album?: string;
  url: string; // The https download URL from Firebase Storage
  storagePath: string; // The path to the file in Firebase Storage
  fileName: string; // Original file name
  createdAt?: Timestamp;
}
