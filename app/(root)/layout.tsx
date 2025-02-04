import Navbar from "@/components/Home/Navbar";
import React from "react";


export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
}
