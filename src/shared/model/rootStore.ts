import { create } from 'zustand'

interface RootStore {
	// user: User | null;
	// budget: Budget | null;
	// setUserData: (user: User) => void;
	// setBudgetData: (budget: Budget | null) => void;
}

export const useRootStore = create<RootStore>(() => ({
	// user: null,
	// budget: null,
	// setUserData: (user) => {
	//   set(() => ({
	//     user: user,
	//   }));
	// },
	// setBudgetData(budget) {
	//   set(() => ({
	//     budget: budget,
	//   }));
	// },
}))
