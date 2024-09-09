import Provider from "@components/Provider";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";

const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        // check if user exist
        const userExist = await User.findOne({ email: profile.email });

        // if Not ,create new User

        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (err) {
        console.log("Error SignIn:", err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
