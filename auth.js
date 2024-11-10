import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import clientPromise from './lib/mongodb';
import { MongoDBAdapter } from '@auth/mongodb-adapter';

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: MongoDBAdapter(clientPromise),
	providers: [GitHub],
});
