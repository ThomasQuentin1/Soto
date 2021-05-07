// @ts-nocheck

import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: "Query";
  account: Account;
  searchProducts: Array<Product>;
  shopList: Array<Shop>;
  cart?: Maybe<Cart>;
  oldCarts: Array<Maybe<Cart>>;
  criterions: Array<Criterion>;
  obligations: Array<Obligation>;
};

export type QuerySearchProductsArgs = {
  query: Scalars["String"];
  obligationsOverride?: Maybe<Array<ObligationInput>>;
  criterionsOverride?: Maybe<Array<CriterionInput>>;
  shopIdOverride?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  login: Scalars["String"];
  register: Scalars["String"];
  setCriterions: Scalars["Boolean"];
  setObligations: Scalars["Boolean"];
  removeAccount: Scalars["Boolean"];
  subscribeNotifications: Scalars["Boolean"];
  changePassword: Scalars["Boolean"];
  changeEmail: Scalars["Boolean"];
  setShop: Scalars["Boolean"];
  addToCart: Scalars["Boolean"];
  removeFromCart: Scalars["Boolean"];
  confirmCart: Scalars["Boolean"];
  clearCart: Scalars["Boolean"];
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  passwordSHA256: Scalars["String"];
};

export type MutationRegisterArgs = {
  email: Scalars["String"];
  passwordSHA256: Scalars["String"];
};

export type MutationSetCriterionsArgs = {
  criterions: Array<CriterionInput>;
};

export type MutationSetObligationsArgs = {
  obligations: Array<ObligationInput>;
};

export type MutationRemoveAccountArgs = {
  passwordSHA256: Scalars["String"];
};

export type MutationSubscribeNotificationsArgs = {
  token: Scalars["String"];
};

export type MutationChangePasswordArgs = {
  newPasswordSHA256: Scalars["String"];
};

export type MutationChangeEmailArgs = {
  newEmail: Scalars["String"];
};

export type MutationSetShopArgs = {
  shopId: Scalars["Int"];
};

export type MutationAddToCartArgs = {
  productId: Scalars["String"];
};

export type MutationRemoveFromCartArgs = {
  productId: Scalars["String"];
};

export type Cart = {
  __typename?: "Cart";
  products: Array<Product>;
  dateCreated: Scalars["Date"];
  dateLastEdit: Scalars["Date"];
  shop: Shop;
  price: Scalars["Float"];
};

export type Shop = {
  __typename?: "Shop";
  name: Scalars["String"];
  city: Scalars["String"];
  long: Scalars["Float"];
  lat: Scalars["Float"];
  id: Scalars["Int"];
  server: Scalars["String"];
  code: Scalars["String"];
};

export type Account = {
  __typename?: "Account";
  email: Scalars["String"];
  currentShop?: Maybe<Shop>;
};

export type Criterion = {
  __typename?: "Criterion";
  activated: Scalars["Boolean"];
  position?: Maybe<Scalars["Int"]>;
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type Obligation = {
  __typename?: "Obligation";
  activated: Scalars["Boolean"];
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type CriterionInput = {
  id: Scalars["Int"];
  position: Scalars["Int"];
};

export type ObligationInput = {
  id: Scalars["Int"];
};

export type Product = {
  __typename?: "Product";
  id: Scalars["String"];
  name: Scalars["String"];
  brand?: Maybe<Scalars["String"]>;
  priceUnit: Scalars["String"];
  priceMass?: Maybe<Scalars["String"]>;
  ingredients?: Maybe<Array<Maybe<Scalars["String"]>>>;
  packaging?: Maybe<Array<Maybe<Scalars["String"]>>>;
  allergens?: Maybe<Array<Maybe<Scalars["String"]>>>;
  nutriments?: Maybe<Array<Maybe<Scalars["String"]>>>;
  nutriscore?: Maybe<Scalars["String"]>;
  scoreHealth?: Maybe<Scalars["Int"]>;
  scoreEnvironment?: Maybe<Scalars["Int"]>;
  finalScore?: Maybe<Scalars["Int"]>;
  packagingQuantity?: Maybe<Scalars["String"]>;
  itemQuantity?: Maybe<Scalars["Int"]>;
  photo: Scalars["String"];
  url: Scalars["String"];
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE",
}

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Cart: ResolverTypeWrapper<Cart>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Shop: ResolverTypeWrapper<Shop>;
  Account: ResolverTypeWrapper<Account>;
  Criterion: ResolverTypeWrapper<Criterion>;
  Obligation: ResolverTypeWrapper<Obligation>;
  CriterionInput: CriterionInput;
  ObligationInput: ObligationInput;
  Product: ResolverTypeWrapper<Product>;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars["Upload"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars["Date"];
  Query: {};
  String: Scalars["String"];
  Int: Scalars["Int"];
  Mutation: {};
  Boolean: Scalars["Boolean"];
  Cart: Cart;
  Float: Scalars["Float"];
  Shop: Shop;
  Account: Account;
  Criterion: Criterion;
  Obligation: Obligation;
  CriterionInput: CriterionInput;
  ObligationInput: ObligationInput;
  Product: Product;
  CacheControlScope: CacheControlScope;
  Upload: Scalars["Upload"];
};

export type CacheControlDirectiveArgs = {
  maxAge?: Maybe<Scalars["Int"]>;
  scope?: Maybe<CacheControlScope>;
};

export type CacheControlDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = CacheControlDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  account?: Resolver<ResolversTypes["Account"], ParentType, ContextType>;
  searchProducts?: Resolver<
    Array<ResolversTypes["Product"]>,
    ParentType,
    ContextType,
    RequireFields<QuerySearchProductsArgs, "query">
  >;
  shopList?: Resolver<Array<ResolversTypes["Shop"]>, ParentType, ContextType>;
  cart?: Resolver<Maybe<ResolversTypes["Cart"]>, ParentType, ContextType>;
  oldCarts?: Resolver<
    Array<Maybe<ResolversTypes["Cart"]>>,
    ParentType,
    ContextType
  >;
  criterions?: Resolver<
    Array<ResolversTypes["Criterion"]>,
    ParentType,
    ContextType
  >;
  obligations?: Resolver<
    Array<ResolversTypes["Obligation"]>,
    ParentType,
    ContextType
  >;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  login?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "email" | "passwordSHA256">
  >;
  register?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, "email" | "passwordSHA256">
  >;
  setCriterions?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationSetCriterionsArgs, "criterions">
  >;
  setObligations?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationSetObligationsArgs, "obligations">
  >;
  removeAccount?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveAccountArgs, "passwordSHA256">
  >;
  subscribeNotifications?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationSubscribeNotificationsArgs, "token">
  >;
  changePassword?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationChangePasswordArgs, "newPasswordSHA256">
  >;
  changeEmail?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeEmailArgs, "newEmail">
  >;
  setShop?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationSetShopArgs, "shopId">
  >;
  addToCart?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationAddToCartArgs, "productId">
  >;
  removeFromCart?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveFromCartArgs, "productId">
  >;
  confirmCart?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  clearCart?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
};

export type CartResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Cart"] = ResolversParentTypes["Cart"]
> = {
  products?: Resolver<
    Array<ResolversTypes["Product"]>,
    ParentType,
    ContextType
  >;
  dateCreated?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  dateLastEdit?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  shop?: Resolver<ResolversTypes["Shop"], ParentType, ContextType>;
  price?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type ShopResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Shop"] = ResolversParentTypes["Shop"]
> = {
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  city?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  long?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  lat?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  server?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type AccountResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Account"] = ResolversParentTypes["Account"]
> = {
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  currentShop?: Resolver<
    Maybe<ResolversTypes["Shop"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type CriterionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Criterion"] = ResolversParentTypes["Criterion"]
> = {
  activated?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type ObligationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Obligation"] = ResolversParentTypes["Obligation"]
> = {
  activated?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type ProductResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Product"] = ResolversParentTypes["Product"]
> = {
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  brand?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  priceUnit?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  priceMass?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  ingredients?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  packaging?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  allergens?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  nutriments?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  nutriscore?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  scoreHealth?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  scoreEnvironment?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  finalScore?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  packagingQuantity?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  itemQuantity?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  photo?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Upload"], any> {
  name: "Upload";
}

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Cart?: CartResolvers<ContextType>;
  Shop?: ShopResolvers<ContextType>;
  Account?: AccountResolvers<ContextType>;
  Criterion?: CriterionResolvers<ContextType>;
  Obligation?: ObligationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Upload?: GraphQLScalarType;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<
  ContextType = any
> = DirectiveResolvers<ContextType>;

export const RegisterDocument = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, passwordSHA256: $password)
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, passwordSHA256: $password)
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const ChangeEmailDocument = gql`
  mutation ChangeEmail($email: String!) {
    changeEmail(newEmail: $email)
  }
`;
export type ChangeEmailMutationFn = Apollo.MutationFunction<
  ChangeEmailMutation,
  ChangeEmailMutationVariables
>;

/**
 * __useChangeEmailMutation__
 *
 * To run a mutation, you first call `useChangeEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeEmailMutation, { data, loading, error }] = useChangeEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useChangeEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeEmailMutation,
    ChangeEmailMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ChangeEmailMutation, ChangeEmailMutationVariables>(
    ChangeEmailDocument,
    options
  );
}
export type ChangeEmailMutationHookResult = ReturnType<
  typeof useChangeEmailMutation
>;
export type ChangeEmailMutationResult = Apollo.MutationResult<ChangeEmailMutation>;
export type ChangeEmailMutationOptions = Apollo.BaseMutationOptions<
  ChangeEmailMutation,
  ChangeEmailMutationVariables
>;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($password: String!) {
    changePassword(newPasswordSHA256: $password)
  }
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const SetCriterionsDocument = gql`
  mutation setCriterions($criterias: [CriterionInput!]!) {
    setCriterions(criterions: $criterias)
  }
`;
export type SetCriterionsMutationFn = Apollo.MutationFunction<
  SetCriterionsMutation,
  SetCriterionsMutationVariables
>;

/**
 * __useSetCriterionsMutation__
 *
 * To run a mutation, you first call `useSetCriterionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetCriterionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setCriterionsMutation, { data, loading, error }] = useSetCriterionsMutation({
 *   variables: {
 *      criterias: // value for 'criterias'
 *   },
 * });
 */
export function useSetCriterionsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetCriterionsMutation,
    SetCriterionsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SetCriterionsMutation,
    SetCriterionsMutationVariables
  >(SetCriterionsDocument, options);
}
export type SetCriterionsMutationHookResult = ReturnType<
  typeof useSetCriterionsMutation
>;
export type SetCriterionsMutationResult = Apollo.MutationResult<SetCriterionsMutation>;
export type SetCriterionsMutationOptions = Apollo.BaseMutationOptions<
  SetCriterionsMutation,
  SetCriterionsMutationVariables
>;
export const SetObligationsDocument = gql`
  mutation setObligations($obligations: [ObligationInput!]!) {
    setObligations(obligations: $obligations)
  }
`;
export type SetObligationsMutationFn = Apollo.MutationFunction<
  SetObligationsMutation,
  SetObligationsMutationVariables
>;

/**
 * __useSetObligationsMutation__
 *
 * To run a mutation, you first call `useSetObligationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetObligationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setObligationsMutation, { data, loading, error }] = useSetObligationsMutation({
 *   variables: {
 *      obligations: // value for 'obligations'
 *   },
 * });
 */
export function useSetObligationsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetObligationsMutation,
    SetObligationsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SetObligationsMutation,
    SetObligationsMutationVariables
  >(SetObligationsDocument, options);
}
export type SetObligationsMutationHookResult = ReturnType<
  typeof useSetObligationsMutation
>;
export type SetObligationsMutationResult = Apollo.MutationResult<SetObligationsMutation>;
export type SetObligationsMutationOptions = Apollo.BaseMutationOptions<
  SetObligationsMutation,
  SetObligationsMutationVariables
>;
export const RemoveAccountDocument = gql`
  mutation removeAccount($password: String!) {
    removeAccount(passwordSHA256: $password)
  }
`;
export type RemoveAccountMutationFn = Apollo.MutationFunction<
  RemoveAccountMutation,
  RemoveAccountMutationVariables
>;

/**
 * __useRemoveAccountMutation__
 *
 * To run a mutation, you first call `useRemoveAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAccountMutation, { data, loading, error }] = useRemoveAccountMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRemoveAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveAccountMutation,
    RemoveAccountMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveAccountMutation,
    RemoveAccountMutationVariables
  >(RemoveAccountDocument, options);
}
export type RemoveAccountMutationHookResult = ReturnType<
  typeof useRemoveAccountMutation
>;
export type RemoveAccountMutationResult = Apollo.MutationResult<RemoveAccountMutation>;
export type RemoveAccountMutationOptions = Apollo.BaseMutationOptions<
  RemoveAccountMutation,
  RemoveAccountMutationVariables
>;
export const SubscribeNotificationsDocument = gql`
  mutation subscribeNotifications($token: String!) {
    subscribeNotifications(token: $token)
  }
`;
export type SubscribeNotificationsMutationFn = Apollo.MutationFunction<
  SubscribeNotificationsMutation,
  SubscribeNotificationsMutationVariables
>;

/**
 * __useSubscribeNotificationsMutation__
 *
 * To run a mutation, you first call `useSubscribeNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeNotificationsMutation, { data, loading, error }] = useSubscribeNotificationsMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useSubscribeNotificationsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SubscribeNotificationsMutation,
    SubscribeNotificationsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SubscribeNotificationsMutation,
    SubscribeNotificationsMutationVariables
  >(SubscribeNotificationsDocument, options);
}
export type SubscribeNotificationsMutationHookResult = ReturnType<
  typeof useSubscribeNotificationsMutation
>;
export type SubscribeNotificationsMutationResult = Apollo.MutationResult<SubscribeNotificationsMutation>;
export type SubscribeNotificationsMutationOptions = Apollo.BaseMutationOptions<
  SubscribeNotificationsMutation,
  SubscribeNotificationsMutationVariables
>;
export const SetShopDocument = gql`
  mutation setShop($shopId: Int!) {
    setShop(shopId: $shopId)
  }
`;
export type SetShopMutationFn = Apollo.MutationFunction<
  SetShopMutation,
  SetShopMutationVariables
>;

/**
 * __useSetShopMutation__
 *
 * To run a mutation, you first call `useSetShopMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetShopMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setShopMutation, { data, loading, error }] = useSetShopMutation({
 *   variables: {
 *      shopId: // value for 'shopId'
 *   },
 * });
 */
export function useSetShopMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetShopMutation,
    SetShopMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SetShopMutation, SetShopMutationVariables>(
    SetShopDocument,
    options
  );
}
export type SetShopMutationHookResult = ReturnType<typeof useSetShopMutation>;
export type SetShopMutationResult = Apollo.MutationResult<SetShopMutation>;
export type SetShopMutationOptions = Apollo.BaseMutationOptions<
  SetShopMutation,
  SetShopMutationVariables
>;
export const AddToCartDocument = gql`
  mutation AddToCart($id: String!) {
    addToCart(productId: $id)
  }
`;
export type AddToCartMutationFn = Apollo.MutationFunction<
  AddToCartMutation,
  AddToCartMutationVariables
>;

/**
 * __useAddToCartMutation__
 *
 * To run a mutation, you first call `useAddToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToCartMutation, { data, loading, error }] = useAddToCartMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddToCartMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddToCartMutation,
    AddToCartMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddToCartMutation, AddToCartMutationVariables>(
    AddToCartDocument,
    options
  );
}
export type AddToCartMutationHookResult = ReturnType<
  typeof useAddToCartMutation
>;
export type AddToCartMutationResult = Apollo.MutationResult<AddToCartMutation>;
export type AddToCartMutationOptions = Apollo.BaseMutationOptions<
  AddToCartMutation,
  AddToCartMutationVariables
>;
export const RemoveFromCartDocument = gql`
  mutation RemoveFromCart($id: String!) {
    removeFromCart(productId: $id)
  }
`;
export type RemoveFromCartMutationFn = Apollo.MutationFunction<
  RemoveFromCartMutation,
  RemoveFromCartMutationVariables
>;

/**
 * __useRemoveFromCartMutation__
 *
 * To run a mutation, you first call `useRemoveFromCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromCartMutation, { data, loading, error }] = useRemoveFromCartMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveFromCartMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveFromCartMutation,
    RemoveFromCartMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveFromCartMutation,
    RemoveFromCartMutationVariables
  >(RemoveFromCartDocument, options);
}
export type RemoveFromCartMutationHookResult = ReturnType<
  typeof useRemoveFromCartMutation
>;
export type RemoveFromCartMutationResult = Apollo.MutationResult<RemoveFromCartMutation>;
export type RemoveFromCartMutationOptions = Apollo.BaseMutationOptions<
  RemoveFromCartMutation,
  RemoveFromCartMutationVariables
>;
export const AccountDocument = gql`
  query Account {
    account {
      email
      currentShop {
        name
      }
    }
  }
`;

/**
 * __useAccountQuery__
 *
 * To run a query within a React component, call `useAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useAccountQuery(
  baseOptions?: Apollo.QueryHookOptions<AccountQuery, AccountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AccountQuery, AccountQueryVariables>(
    AccountDocument,
    options
  );
}
export function useAccountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AccountQuery, AccountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AccountQuery, AccountQueryVariables>(
    AccountDocument,
    options
  );
}
export type AccountQueryHookResult = ReturnType<typeof useAccountQuery>;
export type AccountLazyQueryHookResult = ReturnType<typeof useAccountLazyQuery>;
export type AccountQueryResult = Apollo.QueryResult<
  AccountQuery,
  AccountQueryVariables
>;
export const SearchProductDocument = gql`
  query searchProduct($query: String!) {
    searchProducts(query: $query) {
      name
      brand
      priceUnit
      priceMass
      ingredients
      packaging
      allergens
      nutriments
      nutriscore
      scoreHealth
      scoreEnvironment
      itemQuantity
      packagingQuantity
    }
  }
`;

/**
 * __useSearchProductQuery__
 *
 * To run a query within a React component, call `useSearchProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProductQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchProductQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchProductQuery,
    SearchProductQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchProductQuery, SearchProductQueryVariables>(
    SearchProductDocument,
    options
  );
}
export function useSearchProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchProductQuery,
    SearchProductQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchProductQuery, SearchProductQueryVariables>(
    SearchProductDocument,
    options
  );
}
export type SearchProductQueryHookResult = ReturnType<
  typeof useSearchProductQuery
>;
export type SearchProductLazyQueryHookResult = ReturnType<
  typeof useSearchProductLazyQuery
>;
export type SearchProductQueryResult = Apollo.QueryResult<
  SearchProductQuery,
  SearchProductQueryVariables
>;
export const ShopListDocument = gql`
  query shopList {
    shopList {
      id
      name
      city
      lat
      long
    }
  }
`;

/**
 * __useShopListQuery__
 *
 * To run a query within a React component, call `useShopListQuery` and pass it any options that fit your needs.
 * When your component renders, `useShopListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShopListQuery({
 *   variables: {
 *   },
 * });
 */
export function useShopListQuery(
  baseOptions?: Apollo.QueryHookOptions<ShopListQuery, ShopListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ShopListQuery, ShopListQueryVariables>(
    ShopListDocument,
    options
  );
}
export function useShopListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ShopListQuery,
    ShopListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ShopListQuery, ShopListQueryVariables>(
    ShopListDocument,
    options
  );
}
export type ShopListQueryHookResult = ReturnType<typeof useShopListQuery>;
export type ShopListLazyQueryHookResult = ReturnType<
  typeof useShopListLazyQuery
>;
export type ShopListQueryResult = Apollo.QueryResult<
  ShopListQuery,
  ShopListQueryVariables
>;
export const CartDocument = gql`
  query Cart {
    cart {
      products {
        name
        brand
        priceUnit
        priceMass
        ingredients
        packaging
        allergens
        nutriments
        nutriscore
        scoreHealth
        scoreEnvironment
        itemQuantity
        packagingQuantity
      }
      dateCreated
      dateLastEdit
      shop {
        name
        city
        long
        lat
        id
      }
      price
    }
  }
`;

/**
 * __useCartQuery__
 *
 * To run a query within a React component, call `useCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCartQuery({
 *   variables: {
 *   },
 * });
 */
export function useCartQuery(
  baseOptions?: Apollo.QueryHookOptions<CartQuery, CartQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CartQuery, CartQueryVariables>(CartDocument, options);
}
export function useCartLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CartQuery, CartQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CartQuery, CartQueryVariables>(
    CartDocument,
    options
  );
}
export type CartQueryHookResult = ReturnType<typeof useCartQuery>;
export type CartLazyQueryHookResult = ReturnType<typeof useCartLazyQuery>;
export type CartQueryResult = Apollo.QueryResult<CartQuery, CartQueryVariables>;
