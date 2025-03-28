"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Define TypeScript interfaces for the mentor and recommendation data.
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
  // Get the dynamic userId from the URL.
  const { userId } = useParams();
  
  // State to hold recommendations, loading status, and any errors.
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch recommendations on component mount or whenever userId changes.
  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);

      try {
        // Call your API endpoint.
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

  // Render different states: loading, error, no recommendations, and the recommendation list.
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
