import { gql } from "apollo-server-micro";

const schema = gql`
  scalar Date

  type Query {
    account: Account!
    searchProducts(
      query: String!
      obligationsOverride: [ObligationInput!]
      criterionsOverride: [CriterionInput!]
      shopIdOverride: Int
      limit: Int
    ): [Product!]!
    shopList: [Shop!]!
    cart: Cart
    oldCarts: [Cart]!
    criterions: [Criterion!]!
    obligations: [Obligation!]!
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
    addToCart(productId: String!): Boolean!
    removeFromCart(productId: String!): Boolean!
    confirmCart: Boolean!
    clearCart: Boolean!
  }

  type Cart {
    products: [Product!]!
    dateCreated: Date!
    dateLastEdit: Date!
    shop: Shop!
    price: Float!
  }

  type Shop {
    name: String!
    city: String!
    long: Float!
    lat: Float!
    id: Int!
    server: String!
    code: String!
  }

  type Account {
    email: String!
    currentShop: Shop
  }

  type Criterion {
    activated: Boolean!
    position: Int
    id: Int!
    name: String!
  }

  type Obligation {
    activated: Boolean!
    id: Int!
    name: String!
  }

  input CriterionInput {
    id: Int!
    position: Int!
  }

  input ObligationInput {
    id: Int!
  }

  type Product {
    id: String!
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
    scorePrice: Int
    scoreEnvironment: Int
    finalScore: Int
    packagingQuantity: String
    itemQuantity: Int
    photo: String!
    url: String!
  }
`;

export default schema;
