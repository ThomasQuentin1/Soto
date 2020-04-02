import { gql } from "apollo-server-micro";

const schema = gql`
  type Query {
    getTest: Success!
  }

  type Mutation {
    setTest(message: String!): Success!
  }

  type Success {
    message: String
  }
`;

export default schema;
