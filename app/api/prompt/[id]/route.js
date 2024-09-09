import Post from "@models/post";
import { connectToDB } from "@utils/database";

// GET (READ)
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const post = await Post.findById(params.id).populate("creator");
    if (!post)
      return new Response("Post does not matched the Id", { status: 404 });
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to read matched post", { status: 500 });
  }
};

// PATCH (UPDATE)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const updatedPost = await Post.findById(params.id).populate("creator");
    if (!updatedPost) {
      return new Response("The post does not matched the Id", { status: 404 });
    }

    updatedPost.prompt = prompt;
    updatedPost.tag = tag;
    await updatedPost.save();
    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to updated matched post", { status: 500 });
  }
};
// DELETE (DELETE)
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Post.findByIdAndDelete(params.id);
    return new Response("Prompt has been deleted seccessfully", {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("Failed to delete matched post", { status: 500 });
  }
};
