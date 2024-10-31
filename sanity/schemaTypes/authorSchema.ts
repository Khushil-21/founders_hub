import { IconUser } from "@tabler/icons-react";
import { defineField, defineType } from "sanity";

export const authorSchema = defineType({
	name: "author",
	title: "Author",
	type: "document",
	icon: IconUser,
	fields: [
		defineField({
			name: "id",
			type: "number",
		}),
		defineField({
			name: "name",
			type: "string",
		}),
		defineField({
			name: "username",
			type: "string",
		}),
		defineField({
			name: "email",
			type: "string",
		}),
		defineField({
			name: "image",
			type: "url",
		}),
		defineField({
			name: "bio",
			type: "text",
		}),
	],
	preview: {
		select: {
			title: "name",
		},
	},
});
