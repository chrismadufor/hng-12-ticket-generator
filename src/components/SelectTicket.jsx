"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function SelectTicket({ changePage }) {
  const [ticketData, setTicketData] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(1);

  const saveTicket = () => {
    const data = {
      ...ticketData,
      ticket: tickets[selectedTicket - 1],
      ticketCount: selectedNumber,
    };

    localStorage.setItem("tData", JSON.stringify(data));

    changePage(2);
  };

  const tickets = [
    {
      id: 1,
      price: "Free",
      access: "Regular Access",
      qty: "20/52",
    },
    {
      id: 2,
      price: "$150",
      access: "VIP Access",
      qty: "20/52",
    },
    {
      id: 3,
      price: "$250",
      access: "VVIP Access",
      qty: "20/52",
    },
  ];

  const selectTicket = (id) => {
    setSelectedTicket(id);
  };

  const selectNumber = (id) => {
    console.log(id);
    // setShowOptions(false);
    setSelectedNumber(id);
  };

  useEffect(() => {
    const ticketData = JSON.parse(localStorage.getItem("tData"));
    setTicketData(ticketData);
    setSelectedTicket(ticketData?.ticket?.id || 1);
    setSelectedNumber(ticketData?.ticketCount || 1);
  }, []);

  return (
    <div className="md:p-6 md:bg-primaryTwo md:w-full mt-8 md:border border-strokeMain md:rounded-[32px]">
      <section className="event_info border border-strokeMainTwo rounded-[24px] py-5 md:p-6">
        <div className="max-w-[240px] md:max-w-[340px] mx-auto text-center mb-3">
          <h1 className="road_rage text-[44px] md:text-[62px] mb-2">
            Techember Fest ”25
          </h1>
          <p className="leading-[1.5]">
            Join us for an unforgettable experience at Techember Fest! Secure
            your spot now.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-10 md:mt-2">
          <p>📍 04 Rumens road, Ikoyi, Lagos</p>
          <p className="hidden md:block mx-1">| |</p>
          <p>March 15, 2025 | 7:00 PM</p>
        </div>
      </section>
      <div className="w-full h-1 bg-strokeMainTwo my-8"></div>
      <section className="flex flex-col gap-10">
        <div>
          <p className="mb-3">Select Ticket Type:</p>
          <div className="border-strokeMainTwo md:border md:bg-primaryThree md:rounded-[24px] md:p-3 grid md:grid-cols-3 gap-5">
            {tickets.map((item, index) => (
              <button
                onClick={() => selectTicket(index + 1)}
                key={index}
                className={`text-left cursor-pointer p-3 rounded-[12px] border-[2px] border-strokeColor hover:bg-hoverBg ${
                  selectedTicket === index + 1
                    ? "bg-selectedBg hover:bg-selectedBg border-[1px]"
                    : ""
                }`}
              >
                <p className="font-semibold text-2xl mb-4">{item.price}</p>
                <p className="uppercase mb-3">{item.access}</p>
                <p className="text-sm text-strokeLight">{item.qty}</p>
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3">Number of Tickets</p>
          {/* custom dropdown. Decided to stick with basic */}
          <div className="relative hidden">
            <div
              onClick={() => setShowOptions(!showOptions)}
              className="relative h-12 w-full flex items-center bg-transparent border border-strokeMainTwo px-3 rounded-[12px] cursor-pointer"
            >
              {selectedNumber}
              <div className="absolute right-4 aspect-[11/7] h-2">
                <Image fill src={"/chevron-down.svg"} className="" alt="logo" />
              </div>
            </div>
            {showOptions && (
              <div className="rounded-[12px] border border-strokeMainTwo overflow-hidden bg-primary">
                <p
                  onClick={() => selectNumber(1)}
                  className="p-3 cursor-pointer border-b border-strokeMainTwo hover:bg-strokeMainTwo"
                >
                  1
                </p>
                <p
                  onClick={() => selectNumber(2)}
                  className="p-3 cursor-pointer border-b border-strokeMainTwo hover:bg-strokeMainTwo"
                >
                  2
                </p>
                <p
                  onClick={() => selectNumber(3)}
                  className="p-3 cursor-pointer border-b border-strokeMainTwo hover:bg-strokeMainTwo"
                >
                  3
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <select
              value={selectedNumber}
              onChange={(e) => selectNumber(e.target.value)}
              name="ticketCount"
              id="count"
              className="border border-strokeMainTwo px-3 relative h-12 w-full flex items-center bg-transparent border-[none] rounded-[12px] cursor-pointer focus:outline-transparent appearance-none"
            >
              <option
                className="hover:bg-secondary text-white bg-primary"
                value="1"
              >
                1
              </option>
              <option
                className="hover:bg-secondary text-white bg-primary"
                value="2"
              >
                2
              </option>
              <option
                className="hover:bg-secondary text-white bg-primary"
                value="3"
              >
                3
              </option>
              <option
                className="hover:bg-secondary text-white bg-primary"
                value="4"
              >
                4
              </option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" class="absolute top-1/2 right-4 w-5 h-5 text-white transform -translate-y-1/2 pointer-events-none"><path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd"></path></svg>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <button className="row-start-2 md:row-start-1 h-12 border border border-secondary text-secondary jeju rounded-[8px] hover:border-strokeLight hover:border hover:text-strokeLight">
            Cancel
          </button>
          <button
            onClick={saveTicket}
            className="h-12 border border-secondary bg-secondary jeju rounded-[8px] hover:border-strokeLight hover:border hover:text-strokeLight"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
