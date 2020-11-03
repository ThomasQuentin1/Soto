import { gql } from "apollo-server-micro";

const schema = gql`
  type Query {
    account: Account!
    searchProducts(query: String!): [Product!]!
    shopList: [Shop!]!
  }

  type Mutation {
    login(email: String!, passwordSHA256: String!): String!
    register(email: String!, passwordSHA256: String!): String!
    setCriterions(criterions: [CriterionInput!]!): Boolean!
    setObligations(obligations: [ObligationInput!]!): Boolean!
    removeAccount(passwordSHA256: String!): Boolean!
    subscribeNotifications(token: String!): Boolean!
    changePassword(newPasswordSHA256: String!): Boolean!
    changeEmail(newEmail: String!): Boolean!
    setShop(shopId: Int!): Boolean!
  }

  type Shop {
    name: String!
    city: String!
    long: Float!
    lat: Float!
    id: Int!
  }

  type Account {
    email: String!
    criterions: [Criterion!]!
    obligations: [Obligation!]!
    currentShop: Shop
  }

  type MultilangString {
    en: String
    fr: String
  }

  type Criterion {
    activated: Boolean!
    position: Int
    id: Int!
    name: MultilangString!
  }

  type Obligation {
    activated: Boolean!
    id: Int!
    name: MultilangString!
  }

  input CriterionInput {
    id: Int!
    position: Int!
  }

  input ObligationInput {
    id: Int!
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
