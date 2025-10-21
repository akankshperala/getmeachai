
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import connectDb from '@/db/connect';
import User from '@/app/models/User';
import jwt from "jsonwebtoken"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"


export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDb();
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        // Compare plaintext password directly
        const isValid = await bcrypt.compare( credentials.password , user.password);
        if (!isValid) return null;

        return {
          id: user._id,
          email: user.email,
          name: user.username,
          image: user.profilepic,
        };
      }

    }),
  ],

  session: {
    strategy: 'jwt',
  },
  //   callbacks: {
  //     async signIn({ user, account, profile, email }) {
  //       if (account.provider !== 'github') return true;

  //       await connectDb();
  //       const userEmail = email || user.email || profile?.email;
  //       if (!userEmail) return false;

  //       const existingUser = await User.findOne({ email: userEmail });
  //       if (!existingUser) {
  //         await User.create({
  //           email: userEmail,
  //           username: userEmail.split('@')[0],
  //           name: profile?.name || user.name || userEmail.split('@')[0],
  //         });
  //       }

  //       return true;
  //     },

  //     async session({ session }) {
  //   await connectDb();
  //   const dbUser = await User.findOne({ email: session.user.email });
  //   if (dbUser) {
  //     session.user.name = dbUser.username;
  //     session.user.id = dbUser._id.toString();
  //   }
  //   console.log(session,"hi")
  //   return session;
  //     },
  //   },
  callbacks: {
    async signIn({ user, email, profile, account }) {
      if (account.provider !== "github") return true;
      await connectDb();
      const userEmail = email || profile?.email || user.email
      if (!userEmail) return false
      const existingUser = await User.findOne({ email: userEmail });
      user.newuser = !existingUser;

      // if (!existingUser) {
      // const newuser=new User({
      //     username:userEmail.split("@")[0],
      //     email:userEmail,
      //     name:profile.name || user.name || userEmail.split("@")[0]
      // })
      // await newuser.save();
      // }
      return true
    },
    async jwt({ token, user }) {

      if (user) {
        token.id = user.id || user._id;
        token.username = user.name;
        token.email = user.email;
        token.profilepic = user.image
        console.log(user.newuser)
        token.newuser = user.newuser;

      }

      return token;
    },

    async session({ session, token }) {
      await connectDb();
      // const dbUser = await User.findOne({ email: session.user.email });
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.profilepic = token.profilepic;
        session.user.id = token.id?.toString();
        session.user.newuser = token.newuser; // 👈 copy to session
      }
      return session;
    }
  }
});

export { authoptions as GET, authoptions as POST };
