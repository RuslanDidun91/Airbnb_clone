'use client'
import { SafeUser } from "@/app/types";

import Categories from "./Categories";
import Container from "../Container";
import UserMenu from "./UserMenu";
import Search from "./Search";
import Logo from "./Logo";

interface NavbarProps {
  //type of user was generated during we run npx prisma push
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;