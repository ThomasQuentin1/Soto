import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  __typename?: 'Query';
  account: Account;
  searchProducts: Array<Product>;
  shopList: Array<Shop>;
};


export type QuerySearchProductsArgs = {
  query: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Scalars['String'];
  register: Scalars['String'];
  setCriterions: Scalars['Boolean'];
  setObligations: Scalars['Boolean'];
  removeAccount: Scalars['Boolean'];
  subscribeNotifications: Scalars['Boolean'];
  changePassword: Scalars['Boolean'];
  changeEmail: Scalars['Boolean'];
  setShop: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  passwordSHA256: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  passwordSHA256: Scalars['String'];
};


export type MutationSetCriterionsArgs = {
  criterions: Array<CriterionInput>;
};


export type MutationSetObligationsArgs = {
  obligations: Array<ObligationInput>;
};


export type MutationRemoveAccountArgs = {
  passwordSHA256: Scalars['String'];
};


export type MutationSubscribeNotificationsArgs = {
  token: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPasswordSHA256: Scalars['String'];
};


export type MutationChangeEmailArgs = {
  newEmail: Scalars['String'];
};


export type MutationSetShopArgs = {
  shopId: Scalars['Int'];
};

export type Cart = {
  __typename?: 'Cart';
  products: Array<Product>;
  dateCreated: Scalars['Date'];
  dateLastEdit: Scalars['Date'];
  dateClosed?: Maybe<Scalars['Date']>;
  shop: Shop;
  price: Scalars['Float'];
};

export type Shop = {
  __typename?: 'Shop';
  name: Scalars['String'];
  city: Scalars['String'];
  long: Scalars['Float'];
  lat: Scalars['Float'];
  id: Scalars['Int'];
};

export type Account = {
  __typename?: 'Account';
  email: Scalars['String'];
  criterions: Array<Criterion>;
  obligations: Array<Obligation>;
  currentShop?: Maybe<Shop>;
};

export type MultilangString = {
  __typename?: 'MultilangString';
  en?: Maybe<Scalars['String']>;
  fr?: Maybe<Scalars['String']>;
};

export type Criterion = {
  __typename?: 'Criterion';
  activated: Scalars['Boolean'];
  position?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  name: MultilangString;
};

export type Obligation = {
  __typename?: 'Obligation';
  activated: Scalars['Boolean'];
  id: Scalars['Int'];
  name: MultilangString;
};

export type CriterionInput = {
  id: Scalars['Int'];
  position: Scalars['Int'];
};

export type ObligationInput = {
  id: Scalars['Int'];
};

export type Product = {
  __typename?: 'Product';
  name: Scalars['String'];
  brand?: Maybe<Scalars['String']>;
  priceUnit: Scalars['String'];
  priceMass?: Maybe<Scalars['String']>;
  ingredients?: Maybe<Array<Maybe<Scalars['String']>>>;
  packaging?: Maybe<Array<Maybe<Scalars['String']>>>;
  allergens?: Maybe<Array<Maybe<Scalars['String']>>>;
  nutriments?: Maybe<Array<Maybe<Scalars['String']>>>;
  nutriscore?: Maybe<Scalars['String']>;
  scoreHealth?: Maybe<Scalars['Int']>;
  scoreEnvironment?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Date: ResolverTypeWrapper<Scalars['Date']>,
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Mutation: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Cart: ResolverTypeWrapper<Cart>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  Shop: ResolverTypeWrapper<Shop>,
  Account: ResolverTypeWrapper<Account>,
  MultilangString: ResolverTypeWrapper<MultilangString>,
  Criterion: ResolverTypeWrapper<Criterion>,
  Obligation: ResolverTypeWrapper<Obligation>,
  CriterionInput: CriterionInput,
  ObligationInput: ObligationInput,
  Product: ResolverTypeWrapper<Product>,
  CacheControlScope: CacheControlScope,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars['Date'],
  Query: {},
  String: Scalars['String'],
  Mutation: {},
  Boolean: Scalars['Boolean'],
  Int: Scalars['Int'],
  Cart: Cart,
  Float: Scalars['Float'],
  Shop: Shop,
  Account: Account,
  MultilangString: MultilangString,
  Criterion: Criterion,
  Obligation: Obligation,
  CriterionInput: CriterionInput,
  ObligationInput: ObligationInput,
  Product: Product,
  CacheControlScope: CacheControlScope,
  Upload: Scalars['Upload'],
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>,
  searchProducts?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QuerySearchProductsArgs, 'query'>>,
  shopList?: Resolver<Array<ResolversTypes['Shop']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  login?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'passwordSHA256'>>,
  register?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'passwordSHA256'>>,
  setCriterions?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSetCriterionsArgs, 'criterions'>>,
  setObligations?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSetObligationsArgs, 'obligations'>>,
  removeAccount?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveAccountArgs, 'passwordSHA256'>>,
  subscribeNotifications?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSubscribeNotificationsArgs, 'token'>>,
  changePassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'newPasswordSHA256'>>,
  changeEmail?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationChangeEmailArgs, 'newEmail'>>,
  setShop?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSetShopArgs, 'shopId'>>,
};

export type CartResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cart'] = ResolversParentTypes['Cart']> = {
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>,
  dateCreated?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  dateLastEdit?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  dateClosed?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  shop?: Resolver<ResolversTypes['Shop'], ParentType, ContextType>,
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ShopResolvers<ContextType = any, ParentType extends ResolversParentTypes['Shop'] = ResolversParentTypes['Shop']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  long?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  criterions?: Resolver<Array<ResolversTypes['Criterion']>, ParentType, ContextType>,
  obligations?: Resolver<Array<ResolversTypes['Obligation']>, ParentType, ContextType>,
  currentShop?: Resolver<Maybe<ResolversTypes['Shop']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MultilangStringResolvers<ContextType = any, ParentType extends ResolversParentTypes['MultilangString'] = ResolversParentTypes['MultilangString']> = {
  en?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  fr?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type CriterionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Criterion'] = ResolversParentTypes['Criterion']> = {
  activated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  position?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['MultilangString'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ObligationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Obligation'] = ResolversParentTypes['Obligation']> = {
  activated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['MultilangString'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  brand?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  priceUnit?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  priceMass?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  ingredients?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  packaging?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  allergens?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  nutriments?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  nutriscore?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  scoreHealth?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  scoreEnvironment?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  quantity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType,
  Query?: QueryResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Cart?: CartResolvers<ContextType>,
  Shop?: ShopResolvers<ContextType>,
  Account?: AccountResolvers<ContextType>,
  MultilangString?: MultilangStringResolvers<ContextType>,
  Criterion?: CriterionResolvers<ContextType>,
  Obligation?: ObligationResolvers<ContextType>,
  Product?: ProductResolvers<ContextType>,
  Upload?: GraphQLScalarType,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
