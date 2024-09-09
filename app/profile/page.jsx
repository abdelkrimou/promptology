"use client";
import React, { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@app/loading";
import Link from "next/link";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSignin, setIsSignin] = useState();
  const [myPosts, setMyPosts] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();
      setMyPosts(data);
      setLoading(false);
    };
    if (session?.user.id) {
      fetchPosts();
      setIsSignin(true);
    } else {
      setIsSignin(false);
      setLoading(false);
    }
  }, [session]);
  function handleEdit(post) {
    router.push(`/update-prompt?id=${post._id}`);
  }
  async function handleDelete(post) {
    console.log("delete fun");
    const hasConfirmed = confirm("Are you sure you want to delete this post ?");
    if (hasConfirmed) {
      try {
        await fetch(`api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = myPosts.filter((p) => p._id !== post._id);
        setMyPosts(filteredPosts);
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!isSignin && !loading)
    return (
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          You're not logged in , please Sign in to check your profile
        </span>
      </h1>
    );
  return (
    <>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <Profile
          name="My"
          desc="Welcome to your personalized profile page"
          data={myPosts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default MyProfile;
