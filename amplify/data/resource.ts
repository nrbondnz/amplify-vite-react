import { a, ClientSchema } from "@aws-amplify/backend";
import {
  Stack,
  StackProps,
  aws_dynamodb as dynamodb,
  aws_iam as iam
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class ResourceStack extends Stack {
  public readonly table: dynamodb.Table;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Initialize the DynamoDB table
    this.table = new dynamodb.Table(this, 'MyTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });

    // Define the schema
    const schema = a.schema({
      Todo: a.model({
        content: a.string(),
      }).authorization(allow => [allow.owner()]),
    });

    // Define Schema type
    type Schema = ClientSchema<typeof schema>;

    // Create IAM role
    const role = new iam.Role(this, 'MyRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    });

    role.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['dynamodb:GetItem', 'dynamodb:PutItem'],
      resources: [this.table.tableArn]
    }));
  }
}

// Named export for the type alias
export type { ClientSchema as Schema };