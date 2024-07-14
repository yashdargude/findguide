import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

export default function useUserContext() {
  return useContext(UserContext);
}
