import React from "react";
import PingAnimation from "./PingAnimation";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
// import { unstable_after as after } from "next/server";

export default async function ViewsContainer({ id }: { id: string }) {
	// First increment the view count
	let totalViews = 0;
	try {
		await writeClient.patch(id).inc({ views: 1 }).commit();
		// Then fetch the updated view count
		const { views } = await client
			.withConfig({ useCdn: false })
			.fetch(STARTUP_VIEWS_QUERY, {
				id,
			});
		totalViews = views;
	} catch (error) {
		totalViews = 0;
		console.log("error: ", error);
	}

	// after(async () => {
	// 	await writeClient.patch(id).inc({ views: 1 }).commit();
	// 	// await writeClient
	// 	// 	.patch(id)
	// 	// 	.set({ views: totalViews + 1 })
	// 	// 	.commit();
	// });

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
