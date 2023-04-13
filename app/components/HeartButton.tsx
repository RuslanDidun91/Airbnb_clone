'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "@/app/types";
import ClientOnly from "./ClientOnly";

interface HeartButtonProps {
  listingId: string
  currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {

const hasFavorited = true;
const toggleFavorite = () => {};

  return (
    <div className="relative hover:opacity-80 transition cursor-pointer"
      onClick={toggleFavorite}>
      <AiOutlineHeart
        className="fill-white absolute -top-[2px] -right-[2px]"
        size={28} />
      <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}/>
    </div>
  );
}

export default HeartButton;