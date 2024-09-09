"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";

const PromptCard = ({ post, handleTagClick, handleDelete, handleEdit }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();
  function handleCopy() {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }
  function handleClickProfile() {
    if (post?.creator?._id === session?.user.id) {
      return router.push(`/profile`);
    }
    router.push(`/profile/${post.creator._id}`);
  }
  return (
    <div className="prompt_card ">
      <div className="flex justify-between items-start gap-5">
        <div
          onClick={handleClickProfile}
          className="flex justify-start items-center gap-3 cursor-pointer w-fit"
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col ">
            <h3 className="font-satoshi font-semibold text-gray-900 ">
              {post.creator.username}
            </h3>
            <p className="text-gray-500 font-inter text-sm">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="set"
            width={12}
            height={13}
          />
        </div>
      </div>
      <div className="w-full">
        <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
        <p className="font-inter  text-sm w-full blue_gradient cursor-pointer">
          {post.tag.split(" ").map((tag, i) => (
            <span
              key={i}
              onClick={() => handleTagClick && handleTagClick(tag)}
              className="ml-1 inline-block cursor-pointer hover:text-blue-600"
            >
              {tag}
            </span>
          ))}
        </p>
      </div>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center flex gap-5 border-t border-gray-100  pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
