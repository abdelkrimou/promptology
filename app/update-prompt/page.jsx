"use client";
import Loading from "@app/loading";
import Form from "@components/Form";
import { get } from "mongoose";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UpdatePost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const promptId = searchParams.get("id");
  const [submitting, setSubmitting] = useState();
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      setLoading(true);
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
      setLoading(false);
    };
    if (promptId) {
      getPromptDetails();
    } else {
      setLoading(false);
    }
  }, [promptId]);
  // update function
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) alert("PROMPT-ID NOT FOUND");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/profile");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Form
          type="Edit"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={updatePrompt}
        ></Form>
      )}
    </>
  );
};

export default UpdatePost;
