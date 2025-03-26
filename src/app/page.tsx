
import React from 'react';
import Gradient from '@/myComponents/Gradient';
import Hero from '@/myComponents/Hero';
import Contact from '@/myComponents/Contact';
import Navbar from '@/myComponents/Navbar';
import EventsCalendar from '@/myComponents/EventsCalendar';


const Index = () => {
  return (
    <>
    <div>
      <Navbar/>
    </div>

    <div>
        <Gradient/>
    </div>

    <div>
        <Hero/>
    </div>

    <div>
      <Contact/>
    </div>
    <div>
      <EventsCalendar/>
    </div>
    </>
  );
};

export default Index;
