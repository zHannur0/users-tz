// import bcryptjs from 'bcryptjs';
// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import User from '../../../models/User';
// import db from '../../../utils/db';
// import {IUser, AuthorizedUser} from "../../../types/types";
//
// export default NextAuth({
//   session: {
//     strategy: 'jwt',
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         const authorizedUser = user as AuthorizedUser;
//         token._id = authorizedUser._id;
//         token.isAdmin = authorizedUser.isAdmin;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token?._id) {
//         if (!session.user) session.user = {};
//         session.user._id = token._id;
//         session.user.isAdmin = token.isAdmin;
//       }
//       return session;
//     },
//   },
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         if (!credentials) {
//           throw new Error('Credentials are missing');
//         }
//
//         await db.connect();
//         const user = await User.findOne({
//           email: credentials.email,
//         }) as IUser;
//         await db.disconnect();
//
//         if (user && bcryptjs.compareSync(credentials.password, user.password)) {
//           const authorizedUser: AuthorizedUser = {
//             _id: user._id.toString(),
//             name: user.name,
//             email: user.email,
//             image: 'f', // This should be the URL of the user's image
//             isAdmin: user.isAdmin,
//           };
//           return authorizedUser;
//         }
//         throw new Error('Invalid email or password');
//       },
//     }),
//   ],
// });