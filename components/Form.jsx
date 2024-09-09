import Link from "next/link";
import React from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient capitalize">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompt with the world , and let your
        imaginatiion run wild with ay AI-powered platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            className="form_textarea"
            required
            placeholder="Write your Prompt here ..."
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          ></textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{" "}
            <span className="font-normal text-gray-400">
              (#code #web #design)
            </span>
          </span>
          <input
            className="form_input"
            required
            placeholder="#tag"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
          />
        </label>
        <div className="flex flex-end mx-3 mb-5 gap-4 ">
          <Link href="/" className="text-gra-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary-orange rounded-full text-white text-sm px-5 py-1.5 "
          >
            {submitting
              ? `${type === "create" ? "Creating... " : "Updating..."}`
              : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
