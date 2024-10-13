import { a } from "@aws-amplify/backend";

const schema = a.schema({
	Todo: a
		.model({
			content: a.string(),
		})
		.authorization((allow) => [allow.publicApiKey()]),
});

// Manually defining the Todo type as the type inference is incorrect
export interface TodoType {
	id: string;
	content: string;
}

export default schema;