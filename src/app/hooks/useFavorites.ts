import { useCallback, useMemo } from "react";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const useFavorites = ({
  currentUser,
  listingId,
}: {
  currentUser?: SafeUser | null;
  listingId: string;
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  //   function to detect already liked or not
  const hasFavorited = useMemo(() => {
    const lists = currentUser?.favoriteIds || [];
    return lists.includes(listingId);
  }, [currentUser?.favoriteIds, listingId]);
  // Function to handle onClick like
  const toggleFavorite = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }
      try {
        let req;
        if (hasFavorited) {
          req = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          req = () => axios.post(`/api/favorites/${listingId}`);
        }
        await req();
        router.refresh();
        toast.success(`Successfully ${hasFavorited ? "unliked" : "liked"}! `);
      } catch (err) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );
  return {
    hasFavorited,
    toggleFavorite,
  };
};
export default useFavorites;
