import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Navbar() {
	const session = await auth();
	console.log("session: ", session);
	return (
		<header className="px-5 py-3 bg-white shadow-sm font-work-sans">
			<nav className="flex items-center justify-between">
				<Link href="/">
					<Image src="/logo.png" alt="logo" width={144} height={30} />
				</Link>

				<div className="flex items-center gap-x-5">
					{session && session?.user ? (
						<>
							<Link href={"/startup/create"}>Create</Link>
							<form
								action={async () => {
									"use server";
									await signOut();
								}}
							>
								<button type="submit">Logout</button>
							</form>
							<Link href={`/user/${session?.user?.id}`}>
								{session?.user?.name}
							</Link>
						</>
					) : (
						<>
							<form
								action={async () => {
									"use server";
									await signIn("github");
								}}
							>
								<button type="submit">Login with GitHub</button>
							</form>
						</>
					)}
				</div>
			</nav>
		</header>
	);
}
