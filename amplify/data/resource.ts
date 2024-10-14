import { a, ClientSchema } from "@aws-amplify/backend";
import {
  Stack,
  StackProps,
  aws_iam as iam,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import express from 'express';
import { json } from 'body-parser';
import * as fs from 'fs';
import * as path from 'path';

// Read and parse JSON schema
const schemaPath = path.resolve(__dirname, "../../src/shared/models/AppSchema.json");
const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
const parsedSchema = JSON.parse(schemaContent);

// Ensure parsedSchema.definitions is considered an object
const schemaDefinitions = parsedSchema.definitions as Record<string, typeof a.model>;

// Define the Amplify schema
const amplifySchema = a.schema({
  Todo: a.model({
    content: a.string(),
  }).authorization(allow => [allow.owner()]),
  Muscle: a.model({
    name: a.string(),
    group: a.string(),
  }).authorization(allow => [allow.owner()]),
  ...schemaDefinitions
});

// Export the schema itself for use in client generation
export const SCHEMA = amplifySchema;

// Define Schema type
export type Schema = ClientSchema<typeof SCHEMA>;

export class ResourceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Express application setup
    const app = express();

    // Parse JSON bodies
    app.use(json());

    // Example route to fetch data
    app.get('/api/data', (_req, res) => {
      res.json({ message: 'Data fetched successfully' });
    });

    // Example route to add data
    app.post('/api/data', (req, res) => {
      const data = req.body;
      res.status(201).json({ message: 'Data added successfully', data });
    });

    // Start the Express server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Create IAM role for managing data if needed (optional)
    const role = new iam.Role(this, 'MyRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    });

    role.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['s3:PutObject'],
      resources: ['*']
    }));
  }
}

export type { ClientSchema };