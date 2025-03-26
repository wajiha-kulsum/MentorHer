
import React from 'react';
import Gradient from '@/myComponents/Gradient';
import Hero from '@/myComponents/Hero';
import Contact from '@/myComponents/Contact';
import Navbar from '@/myComponents/Navbar';
import Footer from '@/myComponents/Footer';
import { FAQAccordion } from '@/myComponents/FAQaccordion';

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
      <FAQAccordion/>
    </div>

    

   <div>
     <Footer/>
   </div>
    
    </>
  );
};

export default Index;
