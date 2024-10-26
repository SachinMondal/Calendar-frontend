import React from "react";
import moment from "moment-timezone";

export default function Sidebar({
  currentEvents,
  
  currentTimezone,
  
}) {
  // Check if currentEvents is null or empty
  const sortedEvents = Array.isArray(currentEvents) ? 
    currentEvents
      .filter((event) => moment(event.start).isSameOrAfter(moment().subtract(1, 'days')))
      .sort((a, b) => moment(a.start).diff(moment(b.start))) 
    : [];

  return (
    <div className="bg-gray-300 p-4 shadow-lg w-full">
   

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Upcoming Events ({sortedEvents.length})
        </h2>
        {sortedEvents.length === 0 ? (
          <p className="text-gray-500">No upcoming events.</p>
        ) : (
          <ul className="space-y-3">
            {sortedEvents.map((event) => (
              <SidebarEvent
                key={event.id}
                event={event}
                currentTimezone={currentTimezone}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function SidebarEvent({ event, currentTimezone }) {
  return (
    <li className="p-4 bg-white rounded-lg shadow-md">
      <strong className="block text-orange-400 text-center font-bold">
        {event.title}
      </strong>
      {event.start && (
        (!event.allDay ? (
          <div className="text-gray-600">
            <h1 className="font-medium text-teal-500">
              Starting From {moment(event.start).tz(currentTimezone).format("MMM D, YYYY")}
            </h1>
            <h1 className="font-semibold">
              At {moment(event.start).tz(currentTimezone).format("h:mm A")}
              {event.end && " - " + moment(event.end).tz(currentTimezone).format("h:mm A")}
            </h1>
          </div>
        ) : (
          <div className="text-gray-600">
            <h1 className="font-medium text-teal-500">
              Starting From {moment(event.start).tz(currentTimezone).format("MMM D, YYYY")}
            </h1>
            <h1 className="font-semibold">Whole Day Event</h1>
          </div>
        ))
      )}
    </li>
  );
}
