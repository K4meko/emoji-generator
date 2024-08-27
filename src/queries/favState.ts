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
const useFavStore = create<State>(set => ({
  favItems: JSON.parse(localStorage.getItem("favorites") || "[]"),
  update: () => {
    set(() => ({
      favItems: JSON.parse(localStorage.getItem("favorites") || "[]"),
    }));
  },
}));

export default useFavStore;
