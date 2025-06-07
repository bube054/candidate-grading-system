// src/stores/counter-store.ts
import { createStore } from "zustand/vanilla";
import { CandidateResult } from "@/utils/types";

export type UIState = {
  count: number;
  results: CandidateResult[];
  searchText: string;
  rowsPerPage: number;
};

export type UIActions = {
  decrementCount: () => void;
  incrementCount: () => void;
  setResults: (results: CandidateResult[]) => void;
  setSearchText: (text: string) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
};

export type UIStore = UIState & UIActions;

export const defaultInitState: UIState = {
  count: 0,
  results: [],
  searchText: "",
  rowsPerPage: 1000,
};

export const createUIStore = (initState: UIState = defaultInitState) => {
  return createStore<UIStore>()((set) => ({
    ...initState,
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
    setResults: (results: CandidateResult[]) => set({ results }),
    setSearchText: (text: string) => set({ searchText: text }),
    setRowsPerPage: (rowsPerPage: number) => set({ rowsPerPage }),
  }));
};
