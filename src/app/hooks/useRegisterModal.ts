import { create } from "zustand";

interface RegisterModalProps {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
}
const useRegisterModal = create<RegisterModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export default useRegisterModal
