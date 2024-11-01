import React from "react";
import PingAnimation from "./PingAnimation";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

export default async function ViewsContainer({ id }: { id: string }) {
	const { views: totalViews } = await client
		.withConfig({ useCdn: false })
		.fetch(STARTUP_VIEWS_QUERY, {
			id,
		});

	return (
		<div className="view-container">
			<div className="absolute -top-2 -right-2">
				<PingAnimation />
			</div>

			<p className="view-text">
				<span className="font-black">Views: {totalViews}</span>
			</p>
		</div>
	);
}
