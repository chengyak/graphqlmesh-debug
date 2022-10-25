// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace DataSourceTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

  export type QuerySdk = {
      /** For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions

Equivalent to GET /store/order/{orderId} **/
  order: InContextSdkMethod<Query['order'], QueryorderArgs, MeshContext>,
  /** Returns a single pet

Equivalent to GET /pet/{petId} **/
  pet: InContextSdkMethod<Query['pet'], QuerypetArgs, MeshContext>,
  /** Multiple status values can be provided with comma separated strings

Equivalent to GET /pet/findByStatus **/
  petFindByStatus: InContextSdkMethod<Query['petFindByStatus'], QuerypetFindByStatusArgs, MeshContext>,
  /** Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.

Equivalent to GET /pet/findByTags **/
  petFindByTags: InContextSdkMethod<Query['petFindByTags'], QuerypetFindByTagsArgs, MeshContext>,
  /** Returns a map of status codes to quantities

Equivalent to GET /store/inventory **/
  storeInventory: InContextSdkMethod<Query['storeInventory'], {}, MeshContext>,
  /** Get user by user name

Equivalent to GET /user/{username} **/
  user: InContextSdkMethod<Query['user'], QueryuserArgs, MeshContext>,
  /** Logs user into the system

Equivalent to GET /user/login **/
  userLogin: InContextSdkMethod<Query['userLogin'], QueryuserLoginArgs, MeshContext>,
  /** Logs out current logged in user session

Equivalent to GET /user/logout **/
  userLogout: InContextSdkMethod<Query['userLogout'], {}, MeshContext>
  };

  export type MutationSdk = {
      /** This can only be done by the logged in user.

Equivalent to POST /user **/
  createUser: InContextSdkMethod<Mutation['createUser'], MutationcreateUserArgs, MeshContext>,
  /** Creates list of users with given input array

Equivalent to POST /user/createWithArray **/
  createUsersWithArrayInput: InContextSdkMethod<Mutation['createUsersWithArrayInput'], MutationcreateUsersWithArrayInputArgs, MeshContext>,
  /** Creates list of users with given input array

Equivalent to POST /user/createWithList **/
  createUsersWithListInput: InContextSdkMethod<Mutation['createUsersWithListInput'], MutationcreateUsersWithListInputArgs, MeshContext>,
  /** Place an order for a pet

Equivalent to POST /store/order **/
  placeOrder: InContextSdkMethod<Mutation['placeOrder'], MutationplaceOrderArgs, MeshContext>,
  /** uploads an image

Equivalent to POST /pet/{petId}/uploadImage **/
  uploadFile: InContextSdkMethod<Mutation['uploadFile'], MutationuploadFileArgs, MeshContext>
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["data-source"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      ["headers['authorization']"]: Scalars['ID'],
["fetch"]: typeof fetch
    };
}
