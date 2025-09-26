import { create } from "zustand";
import userStore from "./userStore";
import { persist } from "zustand/middleware";

export const combinedStore = create(
  persist(
    (...a) => ({
      ...userStore(...a),
    }),
    { name: "store" }
  )
);
