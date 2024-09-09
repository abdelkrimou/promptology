"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "../components/PromptCard";
import { MdClear } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@app/loading";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  // const router = useRouter();
  // const pathName = usePathname();
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      const response = await fetch("api/prompt");
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);
  function handleSearchChange(e) {
    setSearchText(e.target.value);
    if (e.target.value.length >= 2) {
      setSearchedPosts(
        posts.filter(
          (data) =>
            data?.creator?.username
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            data?.prompt
              ?.toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            data?.tag?.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setSearchedPosts(posts);
    }
  }
  return (
    <section className="feed">
      <form className="relative w-full flex-center flex">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => handleSearchChange(e)}
          required
          className="search_input peer"
        />
        <MdClear
          onClick={() => setSearchText("")}
          className="absolute right-3 text-xl text-gray-500 hover:text-gray-900 cursor-pointer"
        />
      </form>
      {loading ? (
        <div className="mt-10">
          <Loading />
        </div>
      ) : (
        <PromptCardList
          data={searchText ? searchedPosts : posts}
          handleTagClick={(tag) => {
            setSearchText(tag);
            window.scrollTo({ top: 0, behavior: "smooth" });
            setSearchedPosts(
              posts.filter((post) =>
                post.tag.toLowerCase().includes(tag.toLowerCase())
              )
            );
          }}
        />
      )}
    </section>
  );
};

export default Feed;
