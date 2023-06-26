import { create } from "zustand";

interface RentModalProps {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
}
const useRentModal = create<RentModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export default useRentModal;
