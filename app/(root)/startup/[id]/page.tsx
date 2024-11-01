import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY, STARTUPS_QUERY } from "@/sanity/lib/queries";
import { Startup } from "@/sanity/types";
import { notFound } from "next/navigation";

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

	if (!startup) notFound();

	return <div>{startup.title}</div>;
}
