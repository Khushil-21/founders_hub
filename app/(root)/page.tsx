import SearchForm from "@/components/Home/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/Startup/StartupCard";
import StartupCardSkeleton from "@/components/Startup/StartupCardSkeleton";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { Suspense } from "react";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}) {
	const query = (await searchParams).query;

	const { data: posts } = await sanityFetch({
		query: STARTUPS_QUERY,
		params: { search: query || null },
	});

	return (
		<div>
			<section className="pink_container">
				<h1 className="heading">
					Pitch Your Startup, <br />
					Connect With Entrepreneurs
				</h1>

				<p className="sub-heading !max-w-3xl">
					Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
					Competitions.
				</p>

				<SearchForm query={query} />
			</section>

			<section className="section_container">
				<p className="text-30-semibold">
					{query ? `Search results for "${query}"` : "All Startups"}
				</p>

				<ul className="mt-7 card_grid">
					{posts?.length > 0 ? (
						posts.map((post: StartupTypeCard) => (
							<Suspense key={post?._id} fallback={<StartupCardSkeleton />}>
								<StartupCard post={post} />
							</Suspense>
						))
					) : (
						<p className="no-results">No startups found</p>
					)}
				</ul>
			</section>

			<SanityLive />
		</div>
	);
}
