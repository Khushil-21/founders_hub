import { z } from "zod";

export const formSchema = z.object({
	title: z.string().min(3).max(100),
	description: z.string().min(20).max(500),
	category: z.string().min(3).max(20),
	link: z
		.string()
		.url()
		.refine(async (url) => {
			try {
				// Check if URL ends with common image extensions
				const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
				const lowercaseUrl = url.toLowerCase();
				const hasImageExtension = imageExtensions.some((ext) =>
					lowercaseUrl.endsWith(ext)
				);

				if (hasImageExtension) return true;

				// Fallback to content-type check
				const res = await fetch(url, { method: "HEAD", mode: "no-cors" });
				console.log("------res: ", res);
				const contentType = res.headers.get("content-type");
				return contentType?.startsWith("image/");
			} catch {
				return false;
			}
		}),
	pitch: z.string(),
});
