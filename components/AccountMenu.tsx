import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

import React from "react";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data } = useCurrentUser();

  if (!visible) {
    return null;
  }

  return (
    <div className="flex border-2 border-gray-500 absolute w-56 top-14 right-0 py-5  flex-col">
      <div className="flex flex-col gap-3 ">
        <div className="px-3 group/item flex flex-row gap-2 items-center ">
          <img
            className="w-8 rounded-md"
            src="/images/default-blue.png"
            alt="default"
          />
          <p className="text-white text-sm group-hover/item:underline">
            {data?.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline">
          Logout
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
