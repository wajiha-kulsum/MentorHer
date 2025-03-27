
import React from 'react';
import Gradient from '@/myComponents/Gradient';
import Navbar from '@/myComponents/Navbar';
import Footer from '@/myComponents/Footer';
import { FAQAccordion } from '@/myComponents/FAQaccordion';

import EventsCalendar from '@/myComponents/EventsCalendar';
import AICareerPathGenerator from '@/myComponents/AICareerPathGenerator';
import AllComponents from '@/myComponents/Allcompnents';



const Index = () => {
  return (
    <>
  

    <div>
      <Gradient/>
    </div>

    <div>
      <Navbar/>
    </div>

    
    <div>
      <AICareerPathGenerator/>
    </div>
   
    <div>
      <EventsCalendar/>
    </div>

    <div>
      <FAQAccordion/>
    </div>

    

   <div>
     <Footer/>
   </div>
    <div>
      <AllComponents/>
    </div>
    
    </>
  );
};

export default Index;
