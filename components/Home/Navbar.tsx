import { auth, signIn, signOut } from "@/auth";
import {
	IconBrandGithubFilled,
	IconBrandGoogleFilled,
	IconLogout,
	IconPlus,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default async function Navbar() {
	const session = await auth();
	return (
		<header className="px-5 py-3 bg-white shadow-sm font-work-sans">
			<nav className="flex items-center justify-between">
				<Link href="/" className="flex items-center gap-x-2">
					<Image
						src="/logo.png"
						alt="logo"
						width={50}
						height={50}
						quality={100}
					/>
					<span className="text-2xl font-bold">
						<span className="text-3xl text-blue-500">F</span>
						<span className="text-black-200">ounders</span>
						<span className="text-3xl text-blue-500 ml-2">H</span>
						<span className="text-black-200">ub</span>
					</span>
				</Link>

				<div className="flex items-center gap-x-5">
					{session && session?.user ? (
						<>
							<Link href="/startup/create">
								<span className="max-sm:hidden">Create</span>
								<IconPlus className="size-6 sm:hidden" />
							</Link>

							<form
								action={async () => {
									"use server";

									await signOut({ redirectTo: "/" });
								}}
							>
								<button type="submit">
									<span className="max-sm:hidden">Logout</span>
									<IconLogout className="size-6 sm:hidden text-red-500" />
								</button>
							</form>

							<Link href={`/user/${session?.id}`}>
								<Avatar className="size-10">
									<AvatarImage
										src={session?.user?.image || ""}
										alt={session?.user?.name || ""}
									/>
									<AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
								</Avatar>
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
								<button type="submit">
									<IconBrandGithubFilled className="text-black-200" />
								</button>
							</form>
							<form
								action={async () => {
									"use server";
									await signIn("google");
								}}
							>
								<button type="submit">
									<IconBrandGoogleFilled className="text-black-200" />
								</button>
							</form>
						</>
					)}
				</div>
			</nav>
		</header>
	);
}
