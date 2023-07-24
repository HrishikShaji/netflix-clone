"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";

const page = () => {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/auth");
    }
  }, []);

  const { data: user } = useCurrentUser();
  return (
    <div className="items-center h-full flex justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl text-white text-center">Who is watching?</h1>
        <div className="flex items-center justify-center gap-8 mt-8">
          <div onClick={() => router.push("/")}>
            <div className="group flex-row w-44 mx-auto">
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <img src="/images/default-blue.png" alt="profile" />
              </div>
              <div className="text-white mt-4 test-gray-400 text-2xl text-center group-hover:text-white">
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
