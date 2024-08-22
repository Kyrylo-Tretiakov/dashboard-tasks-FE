import { create } from "zustand";

export type ModalType =
	| "createBoard"
	| "editTask"
	| "deleteBoard"
	| "deleteColumn"
	| "none";

interface ModalStore {
	type: ModalType | null;
	isOpen: boolean;
	data: Record<string, any>;
	onOpen: (type: ModalType, data?: Record<string, any>) => void;
	onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
	type: null,
	isOpen: false,
	data: {},
	onOpen: (type, data) => {
		set({ isOpen: true, type, data });
	},
	onClose: () => set({ type: null, isOpen: false, data: {} }),
}));
