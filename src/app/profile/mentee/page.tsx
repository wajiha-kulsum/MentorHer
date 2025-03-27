'use client';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../myComponents/common/Navbar";
import ProfileHeader from "../../../myComponents/profile-mentee/ProfileHeader";
import ProfileAbout from "../../../myComponents/profile-mentee/ProfileAbout";
import ProfileSkills, { SkillCategory } from "../../../myComponents/profile-mentee/ProfileSkills";
import ProfileSidebar from "../../../myComponents/profile-mentee/ProfileSidebar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, GraduationCap, Target } from "lucide-react";

// Mock data for demo purposes
// In a real app, you'd fetch this data from your API
const mockMenteeData = {
  id: "1",
  fullName: "Emily Chen",
  profilePhoto: "https://randomuser.me/api/portraits/women/33.jpg",
  currentRole: "Junior Developer",
  company: "TechStart Inc.",
  location: "Austin, TX",
  connectionCount: 156,
  headline: "Aspiring full-stack developer | Seeking mentorship in React and Node.js",
  linkedinUrl: "https://linkedin.com/in/emilychen",
  verified: false,
  about: "I'm a junior developer with one year of professional experience, primarily working with JavaScript and React. I'm passionate about web development and looking to grow my skills in full-stack development.\n\nI'm currently working on personal projects to strengthen my portfolio while seeking mentorship to accelerate my learning journey. My goal is to become a proficient full-stack developer within the next two years.",
  technicalBackground: "I have experience with HTML, CSS, JavaScript, and React. I've built several frontend applications and am now learning Node.js and Express to expand into backend development. I'm familiar with Git and have basic knowledge of database concepts.",
  careerGoals: "My short-term goal is to become a competent full-stack developer in the next 1-2 years. Long-term, I aim to lead development teams and potentially specialize in cloud architecture. I'm particularly interested in projects with social impact.",
  mentorshipGoals: "I'm looking for guidance in advancing my technical skills, particularly in backend development and system design. I'd also appreciate career advice for navigating growth opportunities in the tech industry.",
  fieldOfStudy: "Computer Science",
  education: "BS Computer Science, University of Texas",
  skillCategories: [
    {
      name: "Technical Skills",
      skills: ["JavaScript", "React", "HTML", "CSS", "Git", "REST APIs", "Basic Node.js"]
    },
    {
      name: "Learning Goals",
      skills: ["Backend Development", "Database Design", "System Architecture", "Testing", "DevOps"]
    }
  ],
  languages: ["English", "Mandarin"],
  challenges: "I'm currently struggling with understanding complex state management in large applications and best practices for API design. I also find it challenging to balance learning new technologies while maintaining productivity in my current role.",
  preferredMentorshipAreas: ["Web Development", "Career Growth", "Technical Interview Prep"],
  profileViewCount: 78
};

// In real application, get this from authentication state
const isLoggedInUser = true;
const mockCurrentUser = isLoggedInUser ? {
  id: "2",
  fullName: "Emma Watson",
  profilePhoto: "https://randomuser.me/api/portraits/women/22.jpg"
} : null;

const MenteeProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [mentee, setMentee] = useState(mockMenteeData);
  const [loading, setLoading] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(id === "1"); // For demo purposes
  const { toast } = useToast();
  
  // In a real app, fetch the mentee data based on the id
  useEffect(() => {
    // This would be a real API call
    // setLoading(true);
    // api.getMenteeProfile(id).then(data => {
    //   setMentee(data);
    //   setIsOwnProfile(currentUser?.id === data.id);
    //   setLoading(false);
    // }).catch(error => {
    //   toast({
    //     title: "Error loading profile",
    //     description: error.message,
    //     variant: "destructive"
    //   });
    //   setLoading(false);
    // });
  }, [id]);
  
  const handleEditClick = (section: string) => {
    toast({
      title: `Edit ${section}`,
      description: "This functionality will be implemented in a future update.",
    });
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-background/40">
      <Navbar user={mockCurrentUser} />
      
      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProfileHeader 
              mentor={{
                id: mentee.id,
                fullName: mentee.fullName,
                profilePhoto: mentee.profilePhoto,
                currentRole: mentee.currentRole,
                company: mentee.company,
                location: mentee.location,
                connectionCount: mentee.connectionCount,
                headline: mentee.headline,
                linkedinUrl: mentee.linkedinUrl,
                verified: mentee.verified
              }} 
              isOwnProfile={isOwnProfile} 
            />
            
            <ProfileAbout 
              about={mentee.about} 
              isOwnProfile={isOwnProfile}
              onEdit={() => handleEditClick("About")}
            />
            
            <Card className="mb-6 overflow-hidden border-2 border-accent/30">
              <CardHeader className="pb-3 bg-accent/10">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary/70" />
                  Career & Mentorship Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-6">
                <div>
                  <h3 className="font-medium text-lg flex items-center gap-2 mb-3">
                    <GraduationCap className="h-5 w-5 text-primary/70" />
                    Career Goals
                  </h3>
                  <p className="text-lg font-light leading-relaxed">{mentee.careerGoals}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg flex items-center gap-2 mb-3">
                    <Book className="h-5 w-5 text-primary/70" />
                    Mentorship Goals
                  </h3>
                  <p className="text-lg font-light leading-relaxed">{mentee.mentorshipGoals}</p>
                </div>
                
                {mentee.challenges && (
                  <div>
                    <h3 className="font-medium text-lg mb-3">Current Challenges</h3>
                    <p className="text-lg font-light leading-relaxed">{mentee.challenges}</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <ProfileSkills 
              categories={mentee.skillCategories}
              isOwnProfile={isOwnProfile}
              onEdit={() => handleEditClick("Skills")}
            />
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ProfileSidebar 
                languages={mentee.languages}
                education={mentee.education}
                profileViewCount={mentee.profileViewCount}
              />
              
              {/* Areas of Interest Card */}
              {mentee.preferredMentorshipAreas.length > 0 && (
                <Card className="overflow-hidden border-2 border-accent/30 mt-6">
                  <CardContent className="p-5">
                    <h3 className="font-medium text-lg mb-3">Seeking Mentorship In</h3>
                    <div className="flex flex-wrap gap-2">
                      {mentee.preferredMentorshipAreas.map(area => (
                        <div 
                          key={area} 
                          className="px-3 py-1.5 text-sm bg-primary/10 text-primary border border-primary/20 rounded-full"
                        >
                          {area}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Technical Background Card */}
              {mentee.technicalBackground && (
                <Card className="overflow-hidden border-2 border-accent/30 mt-6">
                  <CardContent className="p-5">
                    <h3 className="font-medium text-lg mb-3">Technical Background</h3>
                    <p className="text-base leading-relaxed">{mentee.technicalBackground}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t mt-20 bg-accent/5">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          <p>© 2023 Women in Tech Mentorship Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MenteeProfile;
