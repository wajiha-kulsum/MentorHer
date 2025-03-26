'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Calendar, Star, Users } from 'lucide-react';

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
    isVirtual: true
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
    isVirtual: true
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
    isVirtual: false
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
    isVirtual: true
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
    isVirtual: true
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
    isVirtual: false
  }
];

const EventsCalendar = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleEvents = showAll ? upcomingEvents : upcomingEvents.slice(0, 3);

  return (
    <section id="events" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4">
            Upcoming Events
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Events & <span className="text-gradient-primary">Webinars</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Expand your network and knowledge with our curated events, workshops, and networking opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {visibleEvents.map((event) => (
            <div key={event.id} className="rounded-xl overflow-hidden bg-card shadow-sm border border-border hover-lift">
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-110"
                />
                {event.isVirtual && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-white text-xs font-medium rounded">
                    Virtual
                  </div>
                )}
                <div className="absolute top-3 right-3 px-2 py-1 bg-card/80 backdrop-blur-sm text-foreground text-xs font-medium rounded">
                  {event.category}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{event.title}</h3>
                
                <div className="space-y-2">
                  <div className="flex items-start">
                    <Calendar size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm">{event.date}</p>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users size={16} className="text-primary mr-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{event.attendees} attending</p>
                  </div>
                  
                  <div className="flex items-center">
                    <Star size={16} className="text-primary mr-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors">
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
              className="px-6 py-3 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors inline-flex items-center"
            >
              <Calendar size={18} className="mr-2" />
              View More
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsCalendar;
