import React from "react";
import PingAnimation from "./PingAnimation";

export default function ViewsContainer({ id }: { id: string }) {
	return (
		<div className="view-container">
			<div className="absolute -top-2 -right-2">
				<PingAnimation />
			</div>

			<p className="view-text">
				<span className="font-black">Views: 100</span>
			</p>
		</div>
	);
}
