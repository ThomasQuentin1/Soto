import { gql } from "apollo-server-micro";

const schema = gql`
  type Query {
    getTest: Success!
    searchProducts(query: String!) : [Product]
  }

  type Mutation {
    setTest(message: String!): Success!
  }

  type Success {
    message: String
  }

  type Product {
    name: String!
    brand: String
    priceUnit: String!
    priceMass: String
    ingredients: [String]
    packaging: [String]
    allergens: [String]
    nutriments: [String]
    nutriscore: String
    scoreHealth: Int
    scoreEnvironment: Int
    quantity: String
  }
`;

export default schema;
