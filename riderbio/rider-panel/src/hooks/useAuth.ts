import { useEffect, useState } from "react";
import { currentRider, onAuthChange } from "../lib/pb";
import type { Rider } from "../lib/types";

export function useAuth() {
  const [rider, setRider] = useState<Rider | null>(currentRider());

  useEffect(() => {
    return onAuthChange(setRider);
  }, []);

  return { rider, isAuthed: rider !== null };
}
