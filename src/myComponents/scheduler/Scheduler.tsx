"use client";
import Footer from '../Footer';
import Hero from './Hero';
import MentorCard from './MentorCard';
import Navbar from '../Navbar';

const mentors = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Senior Developer',
    company: 'Google',
    expertise: ['React', 'TypeScript', 'Node.js'],
    isAvailable: true,
    rating: 4.8,
    image: '/mentors/sarah.png', 
    calendarLink: 'https://calendar.google.com/calendar/u/0/r/eventedit'
  },
  {
    id: '2',
    name: 'Michael Lee',
    role: 'Data Scientist',
    company: 'Facebook',
    expertise: ['Python', 'TensorFlow', 'Machine Learning'],
    isAvailable: false,
    rating: 4.6,
    imageUrl: '/mentors/micheal.png',
    calendarLink: 'https://calendar.google.com/calendar/u/0/r/eventedit'
  },
  {
    id: '3',
    name: 'Emily Carter',
    role: 'UX Designer',
    company: 'Airbnb',
    expertise: ['Figma', 'UI/UX', 'Design Thinking'],
    isAvailable: true,
    rating: 4.9,
    imageUrl: '/mentors/emily.png',
    calendarLink: 'https://calendar.google.com/calendar/u/0/r/eventedit'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'DevOps Engineer',
    company: 'Amazon',
    expertise: ['AWS', 'Docker', 'Kubernetes'],
    isAvailable: true,
    rating: 4.7,
    imageUrl: '/mentors/david.png',
    calendarLink: 'https://calendar.google.com/calendar/u/0/r/eventedit'
  },
  {
    id: '5',
    name: 'Sophia Brown',
    role: 'Product Manager',
    company: 'Netflix',
    expertise: ['Agile', 'Product Strategy', 'JIRA'],
    isAvailable: false,
    rating: 4.5,
    imageUrl: '/mentors/sophia.png',
    calendarLink: 'https://calendar.google.com/calendar/u/0/r/eventedit'
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'Cybersecurity Specialist',
    company: 'IBM',
    expertise: ['Cybersecurity', 'Network Security', 'Penetration Testing'],
    isAvailable: true,
    rating: 4.8,
    imageUrl: '/mentors/james.png',
    calendarLink: 'https://calendar.google.com/calendar/u/0/r/eventedit'
  }
];

export default function Scheduler() {
  return (
    <div className="scheduler-container bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 min-h-screen">
      <Navbar />
      <Hero />

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-8">Find Your Mentor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <MentorCard 
              key={mentor.id} 
              {...mentor} 
              imageUrl={mentor.imageUrl || mentor.image || '/default-mentor.png'} 
              delay={index * 100} 
            />
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="text-center my-16 mt-30">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-6">How It Works</h2>
        <p className="mb-8 text-lg text-gray-600">Connect with experienced women in tech for personalized mentorship that fits your schedule and career goals.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Find Your Mentor', 'Book a Session', 'Grow Your Career'].map((title, index) => (
            <div key={index} className="p-8 bg-white border rounded-lg shadow-xl transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">{index + 1}. {title}</h3>
              <p className="text-gray-700">{index === 0 ? 'Browse our community of women tech leaders and find the perfect match for your goals.' : index === 1 ? 'Schedule a time that works for both of you with our integrated calendar system.' : 'Get personalized guidance, feedback, and support to advance in your tech journey.'}</p>
            </div> 
          ))}
        </div>
      </div> 

      {/* Community Feedback Section */}
      <div className="text-center my-16 mt-30">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 mb-6">What Our Community Says</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote: 'Finding a mentor who understood the unique challenges women face in tech completely changed my career trajectory. I\'m now leading my own team!',
              name: 'Emily Chen',
              role: 'Senior Developer'
            },
            {
              quote: 'The mentorship I received gave me the confidence to speak up in meetings and pursue the promotion I deserved. Best decision I\'ve made for my career.',
              name: 'Jessica Williams',
              role: 'Product Manager'
            }
          ].map((testimonial, index) => (
            <div key={index} className="p-8 bg-white border rounded-lg shadow-xl transform transition-transform hover:scale-105">
              <p className="italic text-gray-700 mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold text-purple-600">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
