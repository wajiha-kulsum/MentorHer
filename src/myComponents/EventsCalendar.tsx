"use client";

import Image from "next/image";
import { useState } from "react";
import { Calendar, Star, Users } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "AI & Machine Learning Conference 2025",
    date: "March 29 - 30, 2025",
    time: "10:00 AM - 5:00 PM",
    location: "San Francisco & Virtual",
    image: "/events/event1.jpeg",
    attendees: 850,
    category: "Conference",
    isVirtual: true,
  },
  {
    id: 2,
    title: "Next.js & React Workshop",
    date: "March 30, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Virtual",
    image: "/events/event2.jpeg",
    attendees: 620,
    category: "Workshop",
    isVirtual: true,
  },
  {
    id: 3,
    title: "Cybersecurity & Ethical Hacking Summit",
    date: "March 31 - April 1, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "New York City",
    image: "/events/event3.jpeg",
    attendees: 320,
    category: "Summit",
    isVirtual: false,
  },
  {
    id: 4,
    title: "Women in Tech Leadership Forum",
    date: "April 2, 2025",
    time: "3:00 PM - 6:00 PM",
    location: "Seattle & Virtual",
    image: "/events/event4.jpeg",
    attendees: 400,
    category: "Networking",
    isVirtual: true,
  },
  {
    id: 5,
    title: "Data Science Bootcamp",
    date: "April 3 - 4, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Virtual",
    image: "/events/event5.jpeg",
    attendees: 500,
    category: "Workshop",
    isVirtual: true,
  },
  {
    id: 6,
    title: "Blockchain Innovations Expo",
    date: "April 4, 2025",
    time: "9:00 AM - 7:00 PM",
    location: "Dubai",
    image: "/events/event6.jpeg",
    attendees: 900,
    category: "Summit",
    isVirtual: false,
  },
];

function RegistrationModal({ event, onClose, onRegister }) {
  // 1) Pre-fill title, date, time from the selected event
  const [formData, setFormData] = useState({
    title: event.title || "",
    date: event.date || "",
    time: event.time || "",

    fullName: "",
    email: "",
    phone: "",
    isMentor: "", // "yes" or "no"
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation for all fields
    if (
      formData.fullName &&
      formData.email &&
      formData.phone &&
      formData.isMentor
    ) {
      try {
        const response = await fetch("/api/registerEvent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // In a real application, userId would be retrieved from the authenticated user or token
            userId: "dummyUserId",
            eventId: event.id,
            ...formData,
          }),
        });
        const data = await response.json();

        if (response.ok) {
          setSubmitted(true);
          onRegister(formData);
        } else {
          alert(data.error || "Registration failed");
        }
      } catch (error) {
        console.error(error);
        alert("Registration failed");
      }
    } else {
      alert("Please fill in all the fields.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Register for {event.title}</h2>
        {submitted ? (
          <div className="text-green-600 text-lg">Registered Successfully!</div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Pre-filled fields */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Event Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Event Date</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Event Time</label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                readOnly
              />
            </div>

            {/* User-input fields */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Are you a mentor?</label>
              <div className="flex items-center">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="isMentor"
                    value="yes"
                    onChange={handleChange}
                    checked={formData.isMentor === "yes"}
                    className="mr-1"
                    required
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="isMentor"
                    value="no"
                    onChange={handleChange}
                    checked={formData.isMentor === "no"}
                    className="mr-1"
                    required
                  />
                  No
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const EventsCalendar = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const visibleEvents = showAll ? upcomingEvents : upcomingEvents.slice(0, 3);

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
  };

  const handleModalClose = () => {
    setSelectedEvent(null);
  };

  const handleRegistration = (formData) => {
    console.log("Registered:", formData);
    // Optionally close the modal or perform additional actions after registration.
    // setSelectedEvent(null);
  };

  return (
    <section id="events" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4 backdrop-blur-sm">
            Upcoming Events
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Events &{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Webinars
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Expand your network and knowledge with our curated events, workshops, and networking opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {visibleEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                {event.isVirtual && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium rounded-full shadow-md">
                    Virtual
                  </div>
                )}
                <div className="absolute top-3 right-3 px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full shadow-md">
                  {event.category}
                </div>
              </div>

              <div className="p-5 backdrop-blur-sm">
                <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-purple-500 transition-colors duration-300">
                  {event.title}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <Calendar
                      size={16}
                      className="text-pink-500 mt-0.5 mr-2.5 flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm font-medium">{event.date}</p>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Users size={16} className="text-blue-500 mr-2.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      {event.attendees} attending
                    </p>
                  </div>

                  <div className="flex items-center">
                    <Star size={16} className="text-purple-500 mr-2.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button
                    onClick={() => handleRegisterClick(event)}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          {!showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-foreground font-medium hover:bg-white/20 transition-all duration-300 inline-flex items-center hover:shadow-lg hover:scale-105"
            >
              <Calendar size={18} className="mr-2 text-purple-500" />
              View More Events
            </button>
          )}
        </div>
      </div>

      {selectedEvent && (
        <RegistrationModal
          event={selectedEvent}
          onClose={handleModalClose}
          onRegister={handleRegistration}
        />
      )}
    </section>
  );
};

export default EventsCalendar;
