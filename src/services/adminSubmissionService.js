import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export async function fetchSpotSubmissions() {
  const snap = await getDocs(collection(db, "spotSubmissions"));

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function approveSpotSubmission(submission) {
  await setDoc(doc(db, "spots", submission.id), {
    ...submission,
    status: "approved",
    approvedAt: serverTimestamp(),
  });

  await updateDoc(doc(db, "spotSubmissions", submission.id), {
    status: "approved",
  });
}

export async function rejectSpotSubmission(submissionId) {
  await deleteDoc(doc(db, "spots", submissionId));

  await updateDoc(doc(db, "spotSubmissions", submissionId), {
    status: "rejected",
  });
}
