import { gql } from "apollo-server-micro";

const schema = gql`
  scalar Date

  type Query {
    account: Account!
    searchProducts(query: String!): [Product!]!
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
    addToCart(productId: Int!): Boolean!
    removeFromCart(productId: Int!): Boolean!
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
    scoreEnvironment: Int
    quantity: String
    photo: String!
    url: String!
  }
`;

export default schema;
