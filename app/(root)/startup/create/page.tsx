import StartupForm from "@/components/Startup/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
	const session = await auth();

	if (!session) redirect("/");

	return (
		<div>
			<section className="pink_container !min-h-[280px]">
				<h1 className="heading">Submit Your Startup</h1>
			</section>

			<StartupForm />
		</div>
	);
};

export default Page;
