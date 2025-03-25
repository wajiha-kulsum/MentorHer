
import React from 'react';
import Gradient from '@/myComponents/Gradient';
import Hero from '@/myComponents/Hero';
import Contact from '@/myComponents/Contact';
import Navbar from '@/myComponents/Navbar';


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


    </>
  );
};

export default Index;
