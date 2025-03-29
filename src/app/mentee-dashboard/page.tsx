"use client";
<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
>>>>>>> d1609926c173653fb02484a4d786ffbb329fabcd
import Navigation from '../../myComponents/mentee-dashboard/Navigation';
import StatsCard from '../../myComponents/mentee-dashboard/StatsCard';
import SessionCard from '../../myComponents/mentee-dashboard/SessionsCard';
import MentorCard from '../../myComponents/mentee-dashboard/MentorCard';
import MessageCard from '../../myComponents/mentee-dashboard/MessageCard';
import { Button } from '@/components/ui/button';
import { 
  Users, Calendar, Clock, Star, 
  BookOpen, Search, Bell, Calendar as CalendarIcon 
} from 'lucide-react';

const MenteeDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [menteeData, setMenteeData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    async function fetchMenteeData() {
      try {
        const res = await fetch('/api/auth/menteedata');
        const json = await res.json();
        // Check if mentee data exists
        if (json.success && json.data) {
          setMenteeData(json.data);
        } else {
          router.push('/Become-mentee');
        }
      } catch (error) {
        console.error("Error fetching mentee data:", error);
        router.push('/Become-mentee');
      } finally {
        setLoading(false);
      }
    }
    fetchMenteeData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-pastel-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Mentee Dashboard</h2>
            <p className="text-gray-600">Track your mentorship journey and upcoming sessions</p>
          </div>
          
          <div className="flex gap-3">
            <Button className="bg-white text-gray-800 border hover:bg-gray-50">
              Find Mentors
            </Button>
            <Button className="bg-gradient-to-r from-pastel-purple to-pastel-pink hover:opacity-90">
              Browse Resources
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            icon={Users} 
            label="My Mentors" 
            value={3} 
            iconColor="text-purple-500"
          />
          <StatsCard 
            icon={CalendarIcon} 
            label="Upcoming Sessions" 
            value={2} 
            iconColor="text-blue-500"
          />
          <StatsCard 
            icon={Clock} 
            label="Hours of Mentorship" 
            value={12} 
            iconColor="text-pink-500"
          />
          <StatsCard 
            icon={BookOpen} 
            label="Learning Paths" 
            value={4} 
            iconColor="text-teal-500"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-5 shadow-sm border border-pastel-purple/20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">My Sessions</h3>
                <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
                  View All
                </Button>
              </div>
              
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  Upcoming
                </button>
                <button
                  className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
                  onClick={() => setActiveTab('past')}
                >
                  Past Sessions
                </button>
                <button
                  className={`tab-button ${activeTab === 'requested' ? 'active' : ''}`}
                  onClick={() => setActiveTab('requested')}
                >
                  Requested
                </button>
              </div>
              
              <div className="space-y-4">
                {activeTab === 'upcoming' && (
                  <>
                    <SessionCard 
                      mentor={{
                        name: "Sophia Reynolds",
                        image: "https://randomuser.me/api/portraits/women/23.jpg",
                        expertise: "Senior Product Manager"
                      }}
                      date="October 15, 2023"
                      time="3:00 PM - 4:00 PM"
                      description="Career advancement strategies for women in tech product management"
                      status="upcoming"
                    />
                    <SessionCard 
                      mentor={{
                        name: "Elena Martinez",
                        image: "https://randomuser.me/api/portraits/women/65.jpg",
                        expertise: "Frontend Tech Lead"
                      }}
                      date="October 18, 2023"
                      time="5:30 PM - 6:30 PM"
                      description="Code review of my portfolio project and feedback session"
                      status="upcoming"
                    />
                  </>
                )}
                
                {activeTab === 'past' && (
                  <>
                    <SessionCard 
                      mentor={{
                        name: "Maya Johnson",
                        image: "https://randomuser.me/api/portraits/women/45.jpg",
                        expertise: "UX Research Manager"
                      }}
                      date="October 5, 2023"
                      time="2:00 PM - 3:00 PM"
                      description="How to conduct user interviews effectively for my research project"
                      status="completed"
                    />
                    <SessionCard 
                      mentor={{
                        name: "Sophia Reynolds",
                        image: "https://randomuser.me/api/portraits/women/23.jpg",
                        expertise: "Senior Product Manager"
                      }}
                      date="September 28, 2023"
                      time="4:00 PM - 5:00 PM"
                      description="Initial career guidance and goal-setting session"
                      status="completed"
                    />
                  </>
                )}
                
                {activeTab === 'requested' && (
                  <>
                    <SessionCard 
                      mentor={{
                        name: "Rachel Green",
                        image: "https://randomuser.me/api/portraits/women/76.jpg",
                        expertise: "Tech Startup Founder"
                      }}
                      date="October 25, 2023"
                      time="1:00 PM - 2:00 PM"
                      description="Discussing my startup idea and getting initial feedback"
                      status="upcoming"
                    />
                  </>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-5 shadow-sm border border-pastel-purple/20 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Recommended Mentors</h3>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  <Search className="h-4 w-4 mr-1" />
                  Find More
                </Button>
              </div>
              
              <div className="space-y-4">
                <MentorCard 
                  mentor={{
                    name: "Dr. Amelia Wong",
                    image: "https://randomuser.me/api/portraits/women/33.jpg",
                    role: "Data Science Director",
                    company: "TechCorp",
                    rating: 4.9,
                    topics: ["Machine Learning", "Career Growth", "Leadership"],
                    availability: "Available"
                  }}
                />
                <MentorCard 
                  mentor={{
                    name: "Jessica Chen",
                    image: "https://randomuser.me/api/portraits/women/54.jpg",
                    role: "Engineering Manager",
                    company: "InnovateTech",
                    rating: 4.7,
                    topics: ["Software Architecture", "Team Building", "Technical Interviews"],
                    availability: "Limited"
                  }}
                />
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg p-5 shadow-sm border border-pastel-purple/20">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold text-gray-800">Messages</h3>
                  <div className="ml-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  View All
                </Button>
              </div>
              
              <div className="space-y-3">
                <MessageCard 
                  sender={{
                    name: "Sophia Reynolds",
                    image: "https://randomuser.me/api/portraits/women/23.jpg"
                  }}
                  time="2 hours ago"
                  content="Hi! I've shared some resources for our upcoming session. Could you take a look before we meet?"
                  unread={true}
                />
                <MessageCard 
                  sender={{
                    name: "Elena Martinez",
                    image: "https://randomuser.me/api/portraits/women/65.jpg"
                  }}
                  time="Yesterday"
                  content="Looking forward to our session next week. Don't forget to bring your project questions!"
                  unread={false}
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-5 shadow-sm border border-pastel-purple/20 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Upcoming Events</h3>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  <Bell className="h-4 w-4 mr-1" />
                  Notify Me
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="border border-pastel-purple/20 rounded-lg p-3">
                  <div className="bg-gradient-to-r from-pastel-purple to-pastel-pink h-1 w-full rounded-full mb-3"></div>
                  <h4 className="font-medium text-gray-800">Women in Tech Networking</h4>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    October 20, 2023 • 6:00 PM
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Virtual networking event for women in tech across different roles and industries.
                  </p>
                </div>
                
                <div className="border border-pastel-purple/20 rounded-lg p-3">
                  <div className="bg-gradient-to-r from-pastel-blue to-pastel-purple h-1 w-full rounded-full mb-3"></div>
                  <h4 className="font-medium text-gray-800">Technical Interview Workshop</h4>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    October 25, 2023 • 5:00 PM
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Learn effective strategies for technical interviews from experienced hiring managers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MenteeDashboard;
