import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Sidebar from "./Sidebar";
import moment from "moment-timezone";
import Swal from "sweetalert2";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";

export default function Calendar() {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTimezone, setCurrentTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone || "local"
  );
  const [timezoneOptions, setTimezoneOptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the token from localStorage once and verify it's still valid
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token found
    }
  }, [navigate]); 
  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setCurrentTimezone(userTimezone);
    const timezones = moment.tz.names().slice(0, -1);
    setTimezoneOptions([...timezones]);
  }, []);

  

  async function handleDateSelect(selectInfo) {
    const selectedDateTime = new Date(selectInfo.startStr);
    const now = new Date();
  
    if (selectedDateTime < now) {
      Swal.fire({
        title: "Invalid Selection",
        text: "Cannot create events in the past.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const { value: title } = await Swal.fire({
      title: "Enter event details",
      input: "text",
      inputLabel: "Event Title",
      inputPlaceholder: "Enter event title",
      showCancelButton: true,
    });

    if (title) {
      const newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };

      const token = localStorage.getItem("token");
      const accessToken= localStorage.getItem("access_token");
      try {
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/event`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(newEvent),
        });
        if (response.ok) {
          let calendarApi = selectInfo.view.calendar;
          calendarApi.unselect();
          setCurrentEvents((prevEvents) => [...prevEvents, newEvent]);
          calendarApi.addEvent(newEvent);
          Swal.fire({
            title: "Successfully!",
            text: "The event has been Created.",
            icon: "success",
            timer: 800,
            showConfirmButton: false,
          });
        } else {
          throw new Error("Failed to save event.");
        }
      } catch (error) {
        console.error("Error saving event:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to save event. Please try again.",
          icon: "error",
        });
      }
    }
  }

  useEffect(() => {
    async function fetchEvents() {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/event/`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          },
        });
        
        const data = await response.json();
        if(data.length > 0) {
        const formattedEvents = data.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setCurrentEvents(formattedEvents);
      }
      } catch (error) {
        console.error("Error fetching events:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to fetch events.",
          icon: "error",
        });
      }
    }
  
    fetchEvents();
  }, []);

  async function handleEventClick(clickInfo) {
    const result = await Swal.fire({
      title: `Are you sure you want to delete the event '${clickInfo.event.title}'?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    
    if (result.isConfirmed) {
      const eventId = clickInfo.event._def.extendedProps._id;
      const token = localStorage.getItem("token");
  
      try {
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/event/${eventId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
     

      
        if (response.ok) {
          clickInfo.event.remove();
          Swal.fire({
            title: "Deleted!",
            text: "The event has been deleted.",
            icon: "success",
            timer: 800,
            showConfirmButton: false,
          });
        } else {
          throw new Error("Failed to delete event.");
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to delete event. Please try again.",
          icon: "error",
        });
      }
    }
  }

  async function handleEventChange(changeInfo) {
    const updatedEvent = {
      title: changeInfo.event.title,
      start: changeInfo.event.start.toISOString(),
      end: changeInfo.event.end ? changeInfo.event.end.toISOString() : null,
      allDay: changeInfo.event.allDay,
    };
    
    const token = localStorage.getItem("token");
    const eventId = changeInfo.event._def.extendedProps._id; 
    try {
      const response = await fetch(`${process.env.REACT_APP_BASEURL}/event/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedEvent),
      });

     
      if (!response.ok) {
        throw new Error("Failed to update event.");
      }
  
      Swal.fire({
        title: "Updated!",
        text: "The event has been updated.",
        icon: "success",
        timer: 800,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating event:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update event. Please try again.",
        icon: "error",
      });
    }
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full ">
      <div className={`md:block md:w-1/4 ${isSidebarOpen ? 'block' : 'hidden'} md:hidden`}>
        <Sidebar currentEvents={currentEvents} currentTimezone={currentTimezone} />
      </div>

      <div className="flex-grow bg-teal-100 relative">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, momentTimezonePlugin, listPlugin]}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: "short",
          }}
          headerToolbar={{
            left: "prev,today,next",
            center: "title",
            right: "timeGridDay,timeGridWeek,dayGridMonth,listWeek",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={currentEvents}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventChange={handleEventChange}
          timeZone={currentTimezone}
          height={"800px"}
          dayCellClassNames="text-md p-4"
        />
         <div className="md:hidden fixed bottom-4 right-4 z-50 flex flex-col gap-3">
          </div>
          <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
          <button
            className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600"
            onClick={handleLogout}
          >
            <span className="material-icons">logout</span>
          </button>
            </div>
        
      </div>
    </div>
  );
}