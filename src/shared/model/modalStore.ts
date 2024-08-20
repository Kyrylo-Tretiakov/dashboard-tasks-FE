import { create } from 'zustand';

export type ModalType = 'createBoard' | 'editTask';

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    onOpen: (type: ModalType) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    data: {},
    onOpen: (type,) => {
        set({ isOpen: true, type });
    },
    onClose: () => set({ type: null, isOpen: false }),
}));