// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import OpenapiHandler from "@graphql-mesh/openapi"
import UsePrometheus from "@graphql-mesh/plugin-prometheus";
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { DataSourceTypes } from './sources/data-source/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type Query = {
  /**
   * For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
   *
   * Equivalent to GET /store/order/{orderId}
   */
  order?: Maybe<Order>;
  /**
   * Returns a single pet
   *
   * Equivalent to GET /pet/{petId}
   */
  pet?: Maybe<Pet>;
  /**
   * Multiple status values can be provided with comma separated strings
   *
   * Equivalent to GET /pet/findByStatus
   */
  petFindByStatus?: Maybe<Array<Maybe<Pet>>>;
  /**
   * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
   *
   * Equivalent to GET /pet/findByTags
   */
  petFindByTags?: Maybe<Array<Maybe<Pet>>>;
  /**
   * Returns a map of status codes to quantities
   *
   * Equivalent to GET /store/inventory
   */
  storeInventory?: Maybe<Scalars['JSON']>;
  /**
   * Get user by user name
   *
   * Equivalent to GET /user/{username}
   */
  user?: Maybe<User>;
  /**
   * Logs user into the system
   *
   * Equivalent to GET /user/login
   */
  userLogin?: Maybe<Scalars['String']>;
  /**
   * Logs out current logged in user session
   *
   * Equivalent to GET /user/logout
   */
  userLogout?: Maybe<Scalars['JSON']>;
};


export type QueryorderArgs = {
  orderId: Scalars['Float'];
};


export type QuerypetArgs = {
  petId: Scalars['Float'];
};


export type QuerypetFindByStatusArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  status: Array<InputMaybe<Status4ListItem>>;
};


export type QuerypetFindByTagsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  tags: Array<InputMaybe<Scalars['String']>>;
};


export type QueryuserArgs = {
  username: Scalars['String'];
};


export type QueryuserLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Order = {
  complete?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Float']>;
  petId?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Int']>;
  shipDate?: Maybe<Scalars['String']>;
  /** Order Status */
  status?: Maybe<Status3>;
};

export type Status3 =
  | 'PLACED'
  | 'APPROVED'
  | 'DELIVERED';

export type Pet = {
  category?: Maybe<Category>;
  id?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  photoUrls: Array<Maybe<Scalars['String']>>;
  /** pet status in the store */
  status?: Maybe<Status>;
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type Category = {
  id?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
};

export type Status =
  | 'AVAILABLE'
  | 'PENDING'
  | 'SOLD';

export type Tag = {
  id?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
};

export type Status4ListItem =
  | 'AVAILABLE'
  | 'PENDING'
  | 'SOLD';

export type User = {
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  /** User Status */
  userStatus?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

export type Mutation = {
  /**
   * This can only be done by the logged in user.
   *
   * Equivalent to POST /user
   */
  createUser?: Maybe<Scalars['JSON']>;
  /**
   * Creates list of users with given input array
   *
   * Equivalent to POST /user/createWithArray
   */
  createUsersWithArrayInput?: Maybe<Scalars['JSON']>;
  /**
   * Creates list of users with given input array
   *
   * Equivalent to POST /user/createWithList
   */
  createUsersWithListInput?: Maybe<Scalars['JSON']>;
  /**
   * Place an order for a pet
   *
   * Equivalent to POST /store/order
   */
  placeOrder?: Maybe<Order>;
  /**
   * uploads an image
   *
   * Equivalent to POST /pet/{petId}/uploadImage
   */
  uploadFile?: Maybe<ApiResponse>;
};


export type MutationcreateUserArgs = {
  userInput: UserInput;
};


export type MutationcreateUsersWithArrayInputArgs = {
  userCreateWithArrayInput: Array<InputMaybe<UserInput>>;
};


export type MutationcreateUsersWithListInputArgs = {
  userCreateWithListInput: Array<InputMaybe<UserInput>>;
};


export type MutationplaceOrderArgs = {
  orderInput: OrderInput;
};


export type MutationuploadFileArgs = {
  multipartFormDataInput?: InputMaybe<Scalars['String']>;
  petId: Scalars['Float'];
};

export type UserInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  /** User Status */
  userStatus?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};

export type OrderInput = {
  complete?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['Float']>;
  petId?: InputMaybe<Scalars['Float']>;
  quantity?: InputMaybe<Scalars['Int']>;
  shipDate?: InputMaybe<Scalars['String']>;
  /** Order Status */
  status?: InputMaybe<Status3>;
};

export type ApiResponse = {
  code?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Order>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Status3: Status3;
  Pet: ResolverTypeWrapper<Pet>;
  Category: ResolverTypeWrapper<Category>;
  Status: Status;
  Tag: ResolverTypeWrapper<Tag>;
  Status4ListItem: Status4ListItem;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  User: ResolverTypeWrapper<User>;
  Mutation: ResolverTypeWrapper<{}>;
  UserInput: UserInput;
  OrderInput: OrderInput;
  ApiResponse: ResolverTypeWrapper<ApiResponse>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Order: Order;
  Boolean: Scalars['Boolean'];
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  String: Scalars['String'];
  Pet: Pet;
  Category: Category;
  Tag: Tag;
  JSON: Scalars['JSON'];
  User: User;
  Mutation: {};
  UserInput: UserInput;
  OrderInput: OrderInput;
  ApiResponse: ApiResponse;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryorderArgs, 'orderId'>>;
  pet?: Resolver<Maybe<ResolversTypes['Pet']>, ParentType, ContextType, RequireFields<QuerypetArgs, 'petId'>>;
  petFindByStatus?: Resolver<Maybe<Array<Maybe<ResolversTypes['Pet']>>>, ParentType, ContextType, RequireFields<QuerypetFindByStatusArgs, 'status'>>;
  petFindByTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Pet']>>>, ParentType, ContextType, RequireFields<QuerypetFindByTagsArgs, 'tags'>>;
  storeInventory?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryuserArgs, 'username'>>;
  userLogin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryuserLoginArgs, 'password' | 'username'>>;
  userLogout?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
}>;

export type OrderResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = ResolversObject<{
  complete?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  petId?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  shipDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status3']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Status3Resolvers = { PLACED: 'placed', APPROVED: 'approved', DELIVERED: 'delivered' };

export type PetResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Pet'] = ResolversParentTypes['Pet']> = ResolversObject<{
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  photoUrls?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StatusResolvers = { AVAILABLE: 'available', PENDING: 'pending', SOLD: 'sold' };

export type TagResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Status4ListItemResolvers = { AVAILABLE: 'available', PENDING: 'pending', SOLD: 'sold' };

export interface JSONScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type UserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userStatus?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationcreateUserArgs, 'userInput'>>;
  createUsersWithArrayInput?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationcreateUsersWithArrayInputArgs, 'userCreateWithArrayInput'>>;
  createUsersWithListInput?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationcreateUsersWithListInputArgs, 'userCreateWithListInput'>>;
  placeOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationplaceOrderArgs, 'orderInput'>>;
  uploadFile?: Resolver<Maybe<ResolversTypes['ApiResponse']>, ParentType, ContextType, RequireFields<MutationuploadFileArgs, 'petId'>>;
}>;

export type ApiResponseResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ApiResponse'] = ResolversParentTypes['ApiResponse']> = ResolversObject<{
  code?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  Status3?: Status3Resolvers;
  Pet?: PetResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Status?: StatusResolvers;
  Tag?: TagResolvers<ContextType>;
  Status4ListItem?: Status4ListItemResolvers;
  JSON?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ApiResponse?: ApiResponseResolvers<ContextType>;
}>;


export type MeshContext = DataSourceTypes.Context & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case "dist/src/plugins":
      return import("./../dist/src/plugins") as T;
    
    case ".mesh/sources/data-source/oas-schema":
      return import("./sources/data-source/oas-schema") as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.mesh', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = {"port":8888,"playground":true,"playgroundTitle":"RaaS Data Service Mesh Playground"} as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("🕸️  Mesh");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const dataSourceTransforms = [];
const additionalTypeDefs = [] as any[];
const dataSourceHandler = new OpenapiHandler({
              name: "data-source",
              config: {"source":"https://petstore.swagger.io/v2/swagger.json","baseUrl":"https://petstore.swagger.io/","operationHeaders":{"Authorization":"{context.headers['authorization']}"}},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("data-source"),
              logger: logger.child("data-source"),
              importFn,
            });
sources[0] = {
          name: 'data-source',
          handler: dataSourceHandler,
          transforms: dataSourceTransforms
        }
additionalEnvelopPlugins[0] = await UsePrometheus({
          ...(null),
          logger: logger.child("prometheus"),
          cache,
          pubsub,
          baseDir,
          importFn,
        })
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })
const importedAdditionalEnvelopPlugins = await import("../dist/src/plugins").then(m => m.default || m);
additionalEnvelopPlugins.push(...importedAdditionalEnvelopPlugins)

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler(): MeshHTTPHandler<MeshContext> {
  return createMeshHTTPHandler<MeshContext>({
    baseDir,
    getBuiltMesh: getBuiltMesh,
    rawServeConfig: {"port":8888,"playground":true,"playgroundTitle":"RaaS Data Service Mesh Playground"},
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltMesh(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltMesh().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltMesh().then(({ subscribe }) => subscribe(...args));