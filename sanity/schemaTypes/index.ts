import { type SchemaTypeDefinition } from "sanity";
import { authorSchema } from "./authorSchema";
import { startupSchema } from "./startupSchema";
import { playlist } from "./playlist";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [authorSchema, startupSchema, playlist],
};
