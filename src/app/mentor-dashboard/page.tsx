"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/myComponents/common/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  ThumbsUp,
  Users,
  XCircle,
  BookOpen,
  Star,
  Calendar as CalendarIcon,
  AlertCircle,
  BellRing,
} from "lucide-react";
import { toast } from "sonner";

// Mock data for dashboard components
const mentorAppointments = [
  {
    id: "1",
    menteeName: "Jessica Lee",
    menteePhoto: "https://randomuser.me/api/portraits/women/33.jpg",
    date: "2023-09-15",
    time: "10:00 AM - 11:00 AM",
    status: "pending",
    topic: "Career Transition to Tech",
    message: "I would love to discuss how to transition from marketing to product management in tech."
  },
  {
    id: "2",
    menteeName: "Rachel Green",
    menteePhoto: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "2023-09-18",
    time: "3:00 PM - 4:00 PM",
    status: "accepted",
    topic: "Technical Interview Preparation",
    message: "I have an interview next week and would appreciate your guidance on algorithm questions."
  },
  {
    id: "3",
    menteeName: "Monica Geller",
    menteePhoto: "https://randomuser.me/api/portraits/women/55.jpg",
    date: "2023-09-20",
    time: "2:00 PM - 3:00 PM",
    status: "completed",
    topic: "Leadership in Tech",
    message: "I want to discuss strategies for leading engineering teams effectively."
  },
  {
    id: "4",
    menteeName: "Phoebe Buffay",
    menteePhoto: "https://randomuser.me/api/portraits/women/66.jpg",
    date: "2023-09-22",
    time: "11:00 AM - 12:00 PM",
    status: "declined",
    topic: "Work-Life Balance",
    message: "I'm struggling with burnout and would like to discuss coping strategies."
  }
];

const mentorMessages = [
  {
    id: "1",
    from: "Jessica Lee",
    photo: "https://randomuser.me/api/portraits/women/33.jpg",
    message: "Thank you for accepting my mentorship request! Looking forward to our session.",
    time: "2 hours ago",
    read: false
  },
  {
    id: "2",
    from: "Rachel Green",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    message: "I've shared some resources ahead of our technical interview prep session.",
    time: "Yesterday",
    read: true
  },
  {
    id: "3",
    from: "System Notification",
    photo: "",
    message: "You have 3 new mentee applications to review.",
    time: "2 days ago",
    read: true
  }
];

const mentorStats = {
  totalMentees: 12,
  activeSessionsThisMonth: 8,
  completedSessions: 45,
  averageRating: 4.8,
  hoursContributed: 76
};

const upcomingSessions = [
  {
    id: "1",
    menteeName: "Rachel Green",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "Sep 18, 2023",
    time: "3:00 PM - 4:00 PM",
    topic: "Technical Interview Preparation"
  },
  {
    id: "2",
    menteeName: "Linda Chen",
    photo: "https://randomuser.me/api/portraits/women/28.jpg",
    date: "Sep 25, 2023",
    time: "1:00 PM - 2:00 PM",
    topic: "Frontend Development Best Practices"
  }
];

const MentorDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [mentorData, setMentorData] = useState<any>(null);
  const [appointments, setAppointments] = useState(mentorAppointments);

  // Fetch mentor data on mount
  useEffect(() => {
    async function fetchMentorData() {
      try {
        const res = await fetch("/api/auth/mentordata");
        const json = await res.json();
        // Check if mentor exists
        if (json.success && json.data) {
          setMentorData(json.data);
        } else {
          // If mentor does not exist, redirect to BecomeMentor page
          router.push("/BecomeMentor");
        }
      } catch (error) {
        console.error("Error fetching mentor data:", error);
        router.push("/BecomeMentor");
      } finally {
        setLoading(false);
      }
    }
    fetchMentorData();
  }, [router]);

  // Show loading state while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Dashboard action handlers
  const handleAccept = (id: string) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: "accepted" } : app
    ));
    toast.success("Appointment accepted", { 
      description: "The mentee has been notified of your acceptance."
    });
  };

  const handleDecline = (id: string) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: "declined" } : app
    ));
    toast.success("Appointment declined", { 
      description: "The mentee has been notified."
    });
  };

  const handleComplete = (id: string) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: "completed" } : app
    ));
    toast.success("Session marked as completed", {
      description: "Thank you for contributing to the community!"
    });
  };

  // Filter appointments by status
  const pendingAppointments = appointments.filter(app => app.status === "pending");
  const upcomingAppointments = appointments.filter(app => app.status === "accepted");
  const pastAppointments = appointments.filter(app => app.status === "completed" || app.status === "declined");

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={{ id: "1", fullName: "Sarah Johnson", profilePhoto: "https://randomuser.me/api/portraits/women/44.jpg" }} />

      <main className="container py-8">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
            <p className="text-muted-foreground">Manage your mentorship activities and appointments</p>
          </div>

          <div className="flex space-x-4">
            <Button 
              onClick={() => router.push("/profile/1")} 
              variant="outline" 
              className="flex items-center"
            >
              <Users className="mr-2 h-4 w-4" />
              View Public Profile
            </Button>

            <Button className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Set Availability
            </Button>
          </div>
        </div>

        {/* Dashboard Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Mentees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-primary/70 mr-2" />
                <p className="text-2xl font-bold">{mentorStats.totalMentees}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                This Month's Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary/70 mr-2" />
                <p className="text-2xl font-bold">{mentorStats.activeSessionsThisMonth}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-primary/70 mr-2" />
                <p className="text-2xl font-bold">{mentorStats.completedSessions}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-primary/70 mr-2" />
                <p className="text-2xl font-bold">{mentorStats.averageRating}/5</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="pending">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="pending">
                    Pending Requests
                    {pendingAppointments.length > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {pendingAppointments.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past Sessions</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="pending" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Mentorship Requests</CardTitle>
                    <CardDescription>
                      Review and respond to mentorship session requests
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {pendingAppointments.length === 0 ? (
                      <div className="py-6 text-center">
                        <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-2" />
                        <p className="text-muted-foreground">No pending requests at the moment.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {pendingAppointments.map((appointment) => (
                          <div key={appointment.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={appointment.menteePhoto} />
                                  <AvatarFallback>{appointment.menteeName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{appointment.menteeName}</h4>
                                  <p className="text-sm text-muted-foreground">{appointment.topic}</p>
                                </div>
                              </div>
                              <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                                Pending
                              </Badge>
                            </div>

                            <div className="mb-4 text-sm">
                              <div className="flex items-center text-muted-foreground mb-1">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {appointment.date}
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Clock className="mr-2 h-4 w-4" />
                                {appointment.time}
                              </div>
                            </div>

                            <div className="mb-4 p-3 bg-accent/30 rounded-md text-sm">
                              <p className="italic">"{appointment.message}"</p>
                            </div>

                            <div className="flex space-x-2 justify-end">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleDecline(appointment.id)}
                              >
                                <XCircle className="mr-1 h-4 w-4" />
                                Decline
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => handleAccept(appointment.id)}
                              >
                                <CheckCircle2 className="mr-1 h-4 w-4" />
                                Accept
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="upcoming" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Sessions</CardTitle>
                    <CardDescription>
                      View and prepare for your upcoming mentorship sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {upcomingAppointments.length === 0 ? (
                      <div className="py-6 text-center">
                        <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-2" />
                        <p className="text-muted-foreground">No upcoming sessions scheduled.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {upcomingAppointments.map((appointment) => (
                          <div key={appointment.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={appointment.menteePhoto} />
                                  <AvatarFallback>{appointment.menteeName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{appointment.menteeName}</h4>
                                  <p className="text-sm text-muted-foreground">{appointment.topic}</p>
                                </div>
                              </div>
                              <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
                                Confirmed
                              </Badge>
                            </div>

                            <div className="mb-4 text-sm">
                              <div className="flex items-center text-muted-foreground mb-1">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {appointment.date}
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Clock className="mr-2 h-4 w-4" />
                                {appointment.time}
                              </div>
                            </div>

                            <div className="mb-4 p-3 bg-accent/30 rounded-md text-sm">
                              <p className="italic">"{appointment.message}"</p>
                            </div>

                            <div className="flex space-x-2 justify-end">
                              <Button variant="outline" size="sm">
                                <MessageSquare className="mr-1 h-4 w-4" />
                                Message
                              </Button>
                              <Button size="sm" onClick={() => handleComplete(appointment.id)}>
                                <CheckCircle2 className="mr-1 h-4 w-4" />
                                Mark Complete
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="past" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Past Sessions</CardTitle>
                    <CardDescription>
                      Review your past mentorship sessions and outcomes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {pastAppointments.length === 0 ? (
                      <div className="py-6 text-center">
                        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-2" />
                        <p className="text-muted-foreground">No past sessions yet.</p>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Mentee</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Topic</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pastAppointments.map((appointment) => (
                            <TableRow key={appointment.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-2">
                                    <AvatarImage src={appointment.menteePhoto} />
                                    <AvatarFallback>{appointment.menteeName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                  </Avatar>
                                  {appointment.menteeName}
                                </div>
                              </TableCell>
                              <TableCell>{appointment.date}</TableCell>
                              <TableCell>{appointment.topic}</TableCell>
                              <TableCell>
                                {appointment.status === "completed" ? (
                                  <Badge className="bg-green-50 text-green-700 border-green-200">
                                    Completed
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                    Declined
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                {appointment.status === "completed" && (
                                  <Button variant="ghost" size="sm">
                                    <ThumbsUp className="h-4 w-4" />
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Notifications card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BellRing className="h-5 w-5 text-primary/70" />
                    Messages 
                    <Badge className="ml-2 rounded-full px-1 min-w-[20px] h-5 flex items-center justify-center">
                      {mentorMessages.filter(m => !m.read).length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mentorMessages.map((message) => (
                      <div key={message.id} className={`flex items-start gap-3 p-2 rounded-md ${!message.read ? 'bg-accent/40' : ''}`}>
                        {message.photo ? (
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={message.photo} />
                            <AvatarFallback>{message.from.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-primary/10">
                            <BellRing className="h-4 w-4 text-primary" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <p className="text-sm font-medium">{message.from}</p>
                            <span className="text-xs text-muted-foreground">{message.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {message.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Messages
                  </Button>
                </CardContent>
              </Card>

              {/* Calendar widget */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-primary/70" /> 
                    Your Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="flex items-start gap-3 border-b pb-3 last:border-0">
                        <div className="bg-primary/10 text-primary rounded-md p-2 flex flex-col items-center min-w-14 text-center">
                          <span className="text-xs font-medium">{session.date.split(",")[0]}</span>
                          <span className="text-lg font-bold">{session.date.split(" ")[1]}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{session.topic}</p>
                          <p className="text-xs text-muted-foreground mb-1">with {session.menteeName}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {session.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View Full Calendar
                  </Button>
                </CardContent>
              </Card>

              {/* Quick links */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <Button variant="outline" className="justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Review Mentee Applications
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Update Availability
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Add Resources
                  </Button>
                </CardContent>
              </Card>
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

export default MentorDashboard;
