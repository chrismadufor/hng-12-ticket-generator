import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="text-base md:text-lg">
      <div className="flex items-center justify-between h-[68px] md:h-[76px] px-4 border border-strokeColor rounded-[12px] md:rounded-[24px] bg-primary bg-opacity-40">
        {/* logo */}
        <div className="relative aspect-[93/36] h-9">
          <Image fill src={"/logo.svg"} className="" alt="logo" />
        </div>
        {/* links */}
        <div className="hidden md:flex items-center gap-10">
          <Link href={"#"}>Events</Link>
          <Link href={"#"} className="text-inactiveText hover:text-white">
            My Tickets
          </Link>
          <Link href={"#"} className="text-inactiveText hover:text-white">
            About Project
          </Link>
        </div>
        {/* button */}
        <button className="header-btn w-[141px] h-[44px] md:w-[170px] md:h-[52px] bg-white hover:bg-secondary hover:border-strokeLight hover:border rounded-[12px] text-darkText hover:text-strokeLight jeju uppercase flex items-center gap-2 justify-center text-sm md:text-base">
          My Tickets
          <div className="button-normal relative w-4 md:w-5 h-5 md:h-6">
            <Image
              fill
              src={"/arrow.svg"}
              className="object-contain"
              alt="arrow"
            />
          </div>
          <div className="button-hover relative w-3 md:w-4 h-4 md:h-5">
            <Image
              fill
              src={"/arrow-up.svg"}
              className="object-contain"
              alt="arrow"
            />
          </div>
        </button>
      </div>
    </header>
  );
}
