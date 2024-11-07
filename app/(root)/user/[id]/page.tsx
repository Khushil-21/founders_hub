import { auth } from "@/auth";
import StartupCardSkeleton from "@/components/Startup/StartupCardSkeleton";
import UserStartups from "@/components/User/UserStartups";
import { client } from "@/sanity/lib/client";
import { ALL_AUTHORS_QUERY, AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export const experimental_ppr = true;

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;

	const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

	if (!user) notFound();

	return {
		title: `User Profile | ${user.username}`,
		description: user.bio,
	};
};
export const generateStaticParams = async () => {
	const authors = await client.fetch<{ _id: string }[]>(ALL_AUTHORS_QUERY);
	return authors.map((author) => ({
		id: author._id,
	}));
};

export default async function page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const session = await auth();

	const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
	if (!user) return notFound();
	return (
		<section className="profile_container">
			<div className="profile_card">
				<div className="profile_title">
					<h3 className="text-24-black text-center line-clamp-1">
						{user.name}
					</h3>
				</div>

				<Image
					src={user.image}
					alt={user.name}
					width={220}
					height={220}
					quality={100}
					className="profile_image"
				/>

				<p className="text-30-extrabold mt-7 text-center">@{user?.username}</p>
				<p className="mt-1 text-center text-14-normal">{user?.bio}</p>
			</div>
			<div className="flex-1 flex flex-col gap-5 lg:-mt-5">
				<p className="text-30-bold">
					{session?.id === id ? "Your" : "All"} Startups
				</p>
				<ul className="card_grid-sm">
					<Suspense fallback={<StartupCardSkeleton />}>
						<UserStartups id={id} />
					</Suspense>
				</ul>
			</div>
		</section>
	);
}
