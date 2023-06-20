import { create } from "zustand";

interface LoginModalProps {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
}
const useLoginModal = create<LoginModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export default useLoginModal;
