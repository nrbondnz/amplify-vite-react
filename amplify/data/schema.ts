import { a } from "@aws-amplify/backend";

const schema = a.schema({
	Todo: a
		.model({
			content: a.string(),
		})
		.authorization((allow) => [allow.publicApiKey()]),
});

export default schema;