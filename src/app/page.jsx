"use client";

import AttendeeDetails from "@/components/AttendeeDetails";
import Header from "@/components/Header";
import SelectTicket from "@/components/SelectTicket";
import TicketReady from "@/components/TicketReady";
import { useState } from "react";

export default function Home() {
  let currentTab = Number(localStorage.getItem("tDataTab"))
  const [tab, setTab] = useState(currentTab || 1);
  const barWidth = `${Math.round((tab / 3) * 100)}${"%"}`;

  const changePage = (tab) => {
    localStorage.setItem("tDataTab", tab)
    setTab(tab);
    goToTop();
  };

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Header />
      <div className={`mt-4 md:mt-10 lg:mt-12 max-w-[700px] mx-auto border border-strokeMain ${Number(tab) !== 3 && "px-6"} py-8 lg:p-12 bg-primary rounded-[24px] md:rounded-[40px] min-h-[400px]`}>
        <div className={`${Number(tab) === 3 && "px-6 md:px-0"}`}>
          <div className="flex gap-4 items-center justify-between">
            <h1 className="jeju text-2xl md:text-[32px]">
              {Number(tab) === 1 && "Ticket Selection"}
              {Number(tab) === 2 && "Attendee Details"}
              {Number(tab) === 3 && "Ready"}
            </h1>
            <p>Step {tab}/3</p>
          </div>
          <div className="bg-strokeMain w-full rounded-full h-1 mt-3">
            <div
              style={{ width: barWidth }}
              className={`h-1 bg-secondary rounded-full`}
            ></div>
          </div>
        </div>
        {Number(tab) === 1 && <SelectTicket changePage={changePage} />}
        {Number(tab) === 2 && <AttendeeDetails changePage={changePage} />}
        {Number(tab) === 3 && <TicketReady changePage={changePage} />}
      </div>
    </div>
  );
}
