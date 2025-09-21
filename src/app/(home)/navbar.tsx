import Link from "next/link";
import Image from "next/image";
import SearchInput from "./search-input";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full gap-y-4">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
          <Image src="/livedocs.svg" alt="Logo" width={190} height={110} />
        </Link>
      </div>
      <SearchInput />
      <div className="flex gap-3 items-center pl-6">
        <OrganizationSwitcher 
        afterSelectOrganizationUrl="/"
        afterLeaveOrganizationUrl="/"
        afterSelectPersonalUrl="/"
        afterCreateOrganizationUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
};
