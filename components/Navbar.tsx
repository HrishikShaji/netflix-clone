"use client";
import React, { useEffect, useState } from "react";
import NavbarItem from "./NavbarItem";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const TOP_OFFSET = 66;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleAccountMenu = () => {
    setShowAccountMenu(!showAccountMenu);
  };
  return (
    <div className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-zinc-900 bg-opacity-90 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        } `}>
        <img src="/images/logo.png" alt="logo" className="h-4 " />
        <div className="flex-row ml-8 gap-7 hidden md:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Files" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="md:hidden ml-8 flex flex-row items-center gap-2 cursor-pointer relative">
          <p className="text-white text-sm ">Browse</p>
          <BsChevronDown
            className={`${
              showMobileMenu ? "rotate-180" : "rotate-0"
            } text-white transition`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative ">
            <div className="w-6 h-6 md:w-10 md:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="default" />
            </div>
            <BsChevronDown
              className={`${
                showAccountMenu ? "rotate-180" : "rotate-0"
              } text-white transition`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
