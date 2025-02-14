import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function TicketReady({ changePage }) {
  const formatEmail = (str) => {
    if (str?.length <= 19) return str;
    else return str?.split("@").join(" @");
  };

  const reset = () => {
    localStorage.removeItem("tData");
    changePage(1);
  };

  const downloadTicket = () => {
    alert("Yo yo yo! I'm kidding! 😂🤣");
  };

  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    const ticketData = JSON.parse(localStorage.getItem("tData"));
    setTicketData(ticketData);
  }, []);
  return (
    <div className="mt-8">
      <div className="text-center">
        <h1 className="text-2xl md:text-[32px] atlasi mb-4 md:mb-6">
          Your Ticket is Booked!
        </h1>
        <p>
          Check your email for a copy or you can <b>download</b>
        </p>
      </div>
      <div className="ticket_wrap relative w-full max-w-[300px] mx-auto min-h-[600px] mt-10 md:mt-16 p-[18px]">
        <div className="border border-secondary p-[14px] rounded-[16px] min-h-[446px] max-h-[460px] overflow-hidden flex flex-col gap-5">
          <div className="text-center">
            <h1 className="road_rage text-[34px]">Techember Fest ”25</h1>
            <p className="mb-1 text-[10px]">📍 04 Rumens road, Ikoyi, Lagos</p>
            <p className="text-[10px]">📅 March 15, 2025 | 7:00 PM</p>
          </div>
          <div className="flex justify-center">
            <div className="relative w-[140px] h-[140px] rounded-[12px] border-[4px] border-secondary overflow-hidden">
              <div className="absolute top-0 left-0 h-[140px] aspect-square ">
                <Image
                  src={ticketData?.avatar}
                  fill
                  className="object-cover object-top"
                  alt="upload"
                />
              </div>
            </div>
          </div>
          <div className="rounded-[8px] bg-primaryThree border border-strokeMainThree">
            <div className="p-1 grid grid-cols-2">
              <div className="p-1 border-b border-strokeMainThree">
                <p className="text-white opacity-[33%] text-[10px] mb-1">
                  Enter your name
                </p>
                <p className="font-semibold text-[11px] whitespace-normal">
                  {ticketData?.name}
                </p>
              </div>
              <div className="p-1 border-b border-l pl-2 border-strokeMainThree">
                <p className="text-white opacity-[33%] text-[10px] mb-1">
                  Enter your email *
                </p>
                <p className="font-semibold text-[11px] whitespace-normal">
                  {formatEmail(ticketData?.email)}
                </p>
              </div>
              {/* Below */}
              <div className="p-1 border-b border-strokeMainThree">
                <p className="text-white opacity-[33%] text-[10px] mb-1">
                  Ticket Type:
                </p>
                <p className="text-[11px] whitespace-normal">
                  {ticketData?.ticket.access}
                </p>
              </div>
              <div className="p-1 border-b border-l pl-2 border-strokeMainThree">
                <p className="text-white opacity-[33%] text-[10px] mb-1">
                  Ticket for:
                </p>
                <p className="text-[11px] whitespace-normal">
                  {ticketData?.ticketCount}
                </p>
              </div>
            </div>
            <div className="p-2 border-b border-strokeMainThree">
              <p className="text-white opacity-[33%] text-[10px] mb-1">
                Special Request?
              </p>
              <p className="text-[10px] whitespace-normal">
                {ticketData?.request ? ticketData?.request : "None"}
              </p>
            </div>
          </div>
        </div>
        <div className="barcode absolute h-[112px] bottom-0 left-0 w-full flex items-center justify-center">
          <div className="relative aspect-[236/68] h-[68px]">
            <Image fill src={"/barcode.svg"} className="" alt="logo" />
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-10 px-3 md:px-7 lg:px-0">
        <button
          onClick={reset}
          className="row-start-2 md:row-start-1 h-12 border border border-secondary text-secondary jeju rounded-[8px] hover:text-strokeLight hover:border-strokeLight hover:border"
        >
          Book Another Ticket
        </button>
        <button
          onClick={downloadTicket}
          className="h-12 border border-secondary bg-secondary jeju rounded-[8px] hover:border-strokeLight hover:border hover:text-strokeLight"
        >
          Download Ticket
        </button>
      </div>
    </div>
  );
}
