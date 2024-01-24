import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Still working
function Events() {
  console.log("Events:rerender");

  const [isEventListOpen, setIsEventListOpen] = useState(true);

  const events = [
    { id: 0, event: "Current Events" },
    { id: 1, event: "Trending Events" },
    { id: 2, event: "2024 Events" },
    { id: 3, event: "Charity Gala" },
    { id: 4, event: "Fundraising Walkathon" },
  ];

  function eventListHandler() {
    setIsEventListOpen(!isEventListOpen);
  }

  function getEventStyles(index) {
    if (!isEventListOpen) {
      if (index === 0)
        return `_left0-close absolute border-2 border-text flex items-center h-9 overflow-hidden whitespace-nowrap border-e-[1.6px] border-text bg-red text-bg`;
      if (index === 1)
        return `_left20-close absolute border-2 border-text flex items-center h-9 overflow-hidden whitespace-nowrap border-e-[1.6px] border-text bg-red text-bg `;
      if (index === 2)
        return `_left40-close absolute border-2 border-text flex items-center h-9 overflow-hidden whitespace-nowrap border-e-[1.6px] border-text bg-red text-bg `;
      if (index === 3)
        return `_left60-close absolute border-2 border-text flex items-center h-9 overflow-hidden whitespace-nowrap border-e-[1.6px] border-text bg-red text-bg `;
      if (index === 4)
        return `_left80-close absolute border-2 border-text flex justify-center items-center min-w-[13rem] h-9 overflow-hidden whitespace-nowrap border-e-[1.6px] border-text bg-red text-bg `;
    }

    return (
      `absolute _left` +
      index * 20 +
      `-open bg-red line-clamp-1 whitespace-nowrap border-2 border-text min-w-[13rem] h-9 grid place-content-center rounded text-bg font-medium`
    );
  }

  return (
    <aside>
      <ul
        onClick={eventListHandler}
        className="flex relative bg-slate-500 justify-start"
      >
        <AnimatePresence>
          {events.map((_event) => (
            <motion.li
              onClick={eventListHandler}
              key={_event.id}
              className={getEventStyles(_event.id)}
            >
              {isEventListOpen ? (
                <AnimatePresence>
                  <EventRenderer event={_event.event} flag={isEventListOpen} />
                </AnimatePresence>
              ) : (
                <AnimatePresence>
                  <EventRenderer event={_event.event} flag={isEventListOpen} />
                </AnimatePresence>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </aside>
  );
}

export default Events;

function EventRenderer({ event }) {
  return (
    <motion.span
      initial={{ marginInline: "auto" }}
      animate={{ marginInline: "0" }}
      end={{ marginInline: "auto" }}
      transition={{ duration: 1 }}
    >
      {event}
    </motion.span>
  );
}
