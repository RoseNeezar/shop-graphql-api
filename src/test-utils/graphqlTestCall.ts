import { graphql, GraphQLSchema } from "graphql";
import { Maybe } from "type-graphql";
import { createProductLoader } from "../util/createProductLoader";
import { createMockSchema } from "./mockResolvers";

let schema: GraphQLSchema;

export async function graphqlTestCall({
  source,
  variableValues,
}: {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}) {
  if (!schema) {
    schema = await createMockSchema();
  }

  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      productLoader: createProductLoader(),
    },
  });
}
