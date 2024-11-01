import React from "react";
import PingAnimation from "./PingAnimation";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";

export default async function ViewsContainer({ id }: { id: string }) {
	// await writeClient.patch(id).inc({ views: 1 }).commit();
	const { views: totalViews } = await client
		.withConfig({ useCdn: false })
		.fetch(STARTUP_VIEWS_QUERY, {
			id,
		});

	after(async () => {
		await writeClient.patch(id).inc({ views: 1 }).commit();
		// await writeClient
		// 	.patch(id)
		// 	.set({ views: totalViews + 1 })
		// 	.commit();
	});

	return (
		<div className="view-container">
			<div className="absolute -top-2 -right-2">
				<PingAnimation />
			</div>

			<p className="view-text">
				<span className="font-black">Views: {totalViews + 1}</span>
			</p>
		</div>
	);
}
