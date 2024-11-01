import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY, STARTUPS_QUERY } from "@/sanity/lib/queries";
import { Startup } from "@/sanity/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import markdownit from "markdown-it";
import ViewsContainer from "@/components/Startup/ViewsContainer";

const md = markdownit();

export const experimental_ppr = true;

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;

	const startup = await client.fetch(STARTUP_BY_ID_QUERY, { id });

	if (!startup) notFound();

	return {
		title: startup.title,
		description: startup.description,
	};
};

export const generateStaticParams = async () => {
	const startups = await client.fetch(STARTUPS_QUERY, {
		search: null,
	});

	return startups.map((startup: Startup) => ({
		id: startup._id,
	}));
};

export default async function page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const startup = await client.fetch(STARTUP_BY_ID_QUERY, { id });
	const parsedContent = md.render(startup?.pitch || "");

	if (!startup) notFound();

	return (
		<div>
			<section className="pink_container !min-h-[230px]">
				<p className="tag">{formatDate(startup?._createdAt)}</p>

				<h1 className="heading">{startup.title}</h1>
				<p className="sub-heading !max-w-5xl">{startup.description}</p>
			</section>

			<section className="section_container">
				<Image
					src={startup.image}
					alt="thumbnail"
					width={300}
					height={300}
					quality={100}
					className="w-full h-auto rounded-xl !shadow-lg object-cover aspect-[16/9]"
				/>

				<div className="space-y-5 mt-10 max-w-4xl mx-auto">
					<div className="flex-between gap-5">
						<Link
							href={`/user/${startup.author?._id}`}
							className="flex gap-2 items-center mb-3"
						>
							<Image
								src={startup.author.image}
								alt="avatar"
								width={64}
								height={64}
								className="rounded-full drop-shadow-lg"
							/>

							<div>
								<p className="text-20-medium">{startup.author.name}</p>
								<p className="text-16-medium !text-black-300">
									@{startup.author.username}
								</p>
							</div>
						</Link>

						<p className="category-tag">{startup.category}</p>
					</div>

					<h3 className="text-30-bold">Pitch Details</h3>
					{parsedContent ? (
						<article
							className="prose max-w-4xl font-work-sans break-all"
							dangerouslySetInnerHTML={{ __html: parsedContent }}
						/>
					) : (
						<p className="no-result">No details provided</p>
					)}
				</div>

				<hr className="divider" />

				<Suspense fallback={<Skeleton className="view_skeleton" />}>
					<ViewsContainer id={id} />
				</Suspense>
			</section>
		</div>
	);
}
