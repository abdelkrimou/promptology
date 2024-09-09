import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts </span>
      </h1>
      <p className="desc text-center">
        Promptology is your ultimate source for AI prompts to spark creativity,
        solve problems, and enhance productivity. Discover, share, and unlock
        the potential of AI for every need.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
