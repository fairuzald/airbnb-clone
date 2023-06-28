import { create } from "zustand";

interface SearchModalProps {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
}
const useSearchModal = create<SearchModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export default useSearchModal;
