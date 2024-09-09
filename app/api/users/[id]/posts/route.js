import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const myPosts = await Post.find({ creator: params?.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(myPosts), { status: 200 });
  } catch (err) {
    console.log("Error Fetching your data posts:", err);

    return new Response("Failed to fetch your posts", { status: 500 });
  }
};
