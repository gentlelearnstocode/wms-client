import { create } from 'zustand';

type State = {
  warehouse: string | null;
};

type Action = {
  setWarehouse: (data: State['warehouse']) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  warehouse: null,
  setWarehouse: (id) =>
    set((state) => ({
      warehouse: id,
    })),
}));
