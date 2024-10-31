import React from "react";
import Form from "next/form";
import SearchResetButton from "./SearchResetButton";
import { IconSearch } from "@tabler/icons-react";

export default function SearchForm({ query }: { query?: string }) {
	return (
		<Form action={"/"} scroll={false} className="search-form">
			<input
				type="text"
				name="query"
				className="search-input"
				placeholder="Search Startups"
				defaultValue={query}
			/>
			<div className="flex gap-2">
				{query && <SearchResetButton />}
				<button type="submit" className="search-btn text-white">
					<IconSearch stroke={3} />
				</button>
			</div>
		</Form>
	);
}
