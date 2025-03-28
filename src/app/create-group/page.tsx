"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GroupChatList from "@/myComponents/GroupChatApp";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/user", { cache: "no-store" });
        const data = await res.json();

        // Adjust based on your API response structure
        if (data && data._id) {
          setUser(data);
          router.push("/create-group");
        } else {
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        router.push("/auth/login");
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render nothing if user is not set (as the redirect should be in process)
  if (!user) {
    return null;
  }

  return (
    <div>
      <GroupChatList />
    </div>
  );
};

export default Page;
