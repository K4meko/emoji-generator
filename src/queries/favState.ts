import {create} from "zustand";

type favItem = {
  htmlTag: string;
  category: string;
};

type State = {
  favItems: favItem[];
  update: () => void;
};

// Create your store, which includes both state and (optionally) actions
const usePersonStore = create<State>(set => ({
  favItems: [],
  update: () => {
    set(() => ({
      favItems: JSON.parse(localStorage.getItem("favorites") || "[]"),
    }));
  },
}));

export default usePersonStore;
