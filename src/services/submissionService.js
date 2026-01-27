import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export async function submitSpot(data, userId) {
  return addDoc(collection(db, "spotSubmissions"), {
    ...data,
    createdBy: userId,
    createdAt: serverTimestamp(),
    status: "pending",
  });
}

export async function fetchSubmissions() {
  const snap = await getDocs(collection(db, "spotSubmissions"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function approveSubmission(submission) {
  await setDoc(doc(db, "spots", submission.id), {
    ...submission,
    status: "approved",
    approvedAt: serverTimestamp(),
  });

  await updateDoc(doc(db, "spotSubmissions", submission.id), {
    status: "approved",
  });
}

export async function rejectSubmission(id) {
  await updateDoc(doc(db, "spotSubmissions", id), {
    status: "rejected",
  });
}
