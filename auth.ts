import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [GitHub, Google],
	callbacks: {
		async signIn({ user: { name, email, image }, account, profile }) {
			if (!account && !profile) return false;

			let id, username, bio;

			if (account?.provider === "google") {
				console.log("google");
				id = account.providerAccountId;
				username = email?.split("@")[0] || name;
				bio = "";
			} else if (account?.provider === "github") {
				console.log("github");
				if (!profile) return false;
				id = profile.id;
				username = profile.login;
				bio = profile.bio || "";
			} else {
				return false;
			}

			const existingUser = await client
				.withConfig({ useCdn: false })
				.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
					id: id?.toString(),
				});

			if (!existingUser) {
				await writeClient.create({
					_type: "author",
					id: id?.toString(),
					name,
					username,
					email,
					image,
					bio,
				});
			}

			return true;
		},
		async jwt({ token, account, profile }) {
			if (account && profile) {
				let userId;
				if (account.provider === "google") {
					userId = account.providerAccountId;
				} else if (account.provider === "github") {
					userId = profile.id;
				}

				if (userId) {
					const user = await client
						.withConfig({ useCdn: false })
						.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
							id: userId.toString(),
						});

					token.id = user?._id;
				}
			}

			return token;
		},
		async session({ session, token }) {
			Object.assign(session, { id: token.id });
			return session;
		},
	},
});
