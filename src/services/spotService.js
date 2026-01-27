import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function fetchApprovedSpots() {
  try {
    const q = query(collection(db, "spots"), where("status", "==", "approved"));

    const snap = await getDocs(q);

    return snap.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((spot) => spot.status === "approved")
      .sort((a, b) => {
        const aTime = a.approvedAt?.seconds ?? 0;
        const bTime = b.approvedAt?.seconds ?? 0;
        return bTime - aTime;
      });
  } catch {
    return [];
  }
}

export function filterSpots(spots, { search, wifiOnly }) {
  let result = spots;

  if (search) {
    const s = search.toLowerCase();
    result = result.filter(
      (spot) =>
        spot.name?.toLowerCase().includes(s) ||
        spot.location?.toLowerCase().includes(s) ||
        spot.tags?.some((tag) => tag.toLowerCase().includes(s)),
    );
  }

  if (wifiOnly) {
    result = result.filter((spot) => spot.wifi === true);
  }

  return result;
}
