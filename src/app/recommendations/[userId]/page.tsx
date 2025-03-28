"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Mentor {
  userId: string;
  fullName: string;
  email: string;
  profilePhoto?: string;
  currentRole?: string;
  company?: string;
  mentoringGoals?: string;
  technicalSkills?: string[];
  areasOfInterest?: string[];
}

interface Recommendation {
  similarity: number;
  mentor: Mentor;
}

const RecommendationsPage = () => {
  const { userId } = useParams();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menteeData, setMenteeData] = useState<any>(null);

  // Fetch mentee data
  useEffect(() => {
    async function fetchMenteeData() {
      try {
        const res = await fetch("/api/auth/menteedata");

        // If unauthorized, redirect to login
        if (res.status === 401) {
          router.push("/auth/login");
          return;
        }

        const json = await res.json();

        if (json.success && json.data) {
          setMenteeData(json.data);
          router.push(`/recommendations/${userId}`);
        } else {
          router.push("/Become-mentee");
        }
      } catch (error) {
        console.error("Error fetching mentee data:", error);
        router.push("/Become-mentee");
      } finally {
        setLoading(false);
      }
    }
    fetchMenteeData();
  }, [router, userId]);

  // Fetch recommendations data
  useEffect(() => {
    const fetchRecommendations = async () => {
      // It’s fine to set loading here as well if needed
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/recommendations/${userId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch recommendations");
        }
        const data = await res.json();
        setRecommendations(data.recommendations);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRecommendations();
    }
  }, [userId]);

  // Now, conditionally render the UI after all hooks have been called.
  if (loading) {
    return <div className="container mx-auto py-8">Loading recommendations...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8 text-red-500">Error: {error}</div>;
  }

  if (recommendations.length === 0) {
    return <div className="container mx-auto py-8">No mentor recommendations found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Mentor Recommendations</h1>
      <ul className="space-y-4">
        {recommendations.map((rec, index) => (
          <li
            key={index}
            className="p-4 border rounded-lg flex items-center space-x-4 shadow-sm"
          >
            {rec.mentor.profilePhoto && (
              <img
                src={rec.mentor.profilePhoto}
                alt={rec.mentor.fullName}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <h2 className="text-xl font-semibold">{rec.mentor.fullName}</h2>
              <p className="text-gray-700">
                {rec.mentor.currentRole} {rec.mentor.company && `at ${rec.mentor.company}`}
              </p>
              <p className="text-gray-600">Email: {rec.mentor.email}</p>
              <p className="text-sm text-gray-500">
                Similarity Score: {(rec.similarity * 100).toFixed(2)}%
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationsPage;
