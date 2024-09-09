"use client";
import React, { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Loading from "@app/loading";

const MyProfile = () => {
  const params = useParams();
  const { data: session } = useSession();
  const { id } = params;
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };

    if (id) fetchPosts();
  }, [session]);

  return (
    <>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <Profile
          name={posts?.[0]?.creator?.username}
          desc={`Welcome to ${posts?.[0].creator?.username} personalized profile page. Explore ${posts?.[0].creator?.username}'s exceptional prompts and be inspired by the power of their imagination. `}
          data={posts}
        />
      )}
    </>
  );
};

export default MyProfile;
