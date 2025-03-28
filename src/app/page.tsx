import React from 'react'; 
import Gradient from '@/myComponents/Gradient'; 
import Navbar from '@/myComponents/Navbar'; 
import Footer from '@/myComponents/Footer'; 
import { FAQAccordion } from '@/myComponents/FAQaccordion';  
import EventsCalendar from '@/myComponents/EventsCalendar'; 
import AICareerPathGenerator from '@/myComponents/AICareerPathGenerator'; 
import AllComponents from '@/myComponents/Allcompnents'; 
import { NotificationProvider } from '../myComponents/Notification/NotificationContext'; 
import { SendNotification } from '../myComponents/Notification/SendNotification'; 
import { TopRightNotifications } from '../myComponents/Notification/TopRightNotifications';
import { NotificationList } from '../myComponents/Notification/NotificationList';
import ContactUs from '@/myComponents/ContactUS';

const Index = () => {   
  return (     
    <NotificationProvider>
      <div className="relative">
        {/* Top Right Notifications */}
        <TopRightNotifications />

        {/* Navbar */}
        <Navbar />

        {/* Page Components */}
        <Gradient />
        <AICareerPathGenerator />
        <EventsCalendar />
        <FAQAccordion />
        <AllComponents />
        <ContactUs />

        {/* Notification Components */}
        <div className="container mx-auto p-6 grid md:grid-cols-2 gap-6">
          <SendNotification              
            currentUserId="user123"              
            currentUserName="Alex Johnson"              
            mentorId="mentor456"
          />
          <NotificationList />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </NotificationProvider>
  ); 
}; 

export default Index;
