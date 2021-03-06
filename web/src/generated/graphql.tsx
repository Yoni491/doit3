import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Item = {
  __typename?: 'Item';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createItem: Item;
  deleteItem?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateItemArgs = {
  name: Scalars['String'];
};


export type MutationDeleteItemArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  items: Array<Item>;
};

export type CreateItemMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'Item', id: string, name: string } };

export type DeleteItemMutationVariables = Exact<{
  deleteItemId: Scalars['String'];
}>;


export type DeleteItemMutation = { __typename?: 'Mutation', deleteItem?: boolean | null | undefined };

export type ItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: string, name: string }> };


export const CreateItemDocument = gql`
    mutation CreateItem($name: String!) {
  createItem(name: $name) {
    id
    name
  }
}
    `;

export function useCreateItemMutation() {
  return Urql.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument);
};
export const DeleteItemDocument = gql`
    mutation DeleteItem($deleteItemId: String!) {
  deleteItem(id: $deleteItemId)
}
    `;

export function useDeleteItemMutation() {
  return Urql.useMutation<DeleteItemMutation, DeleteItemMutationVariables>(DeleteItemDocument);
};
export const ItemsDocument = gql`
    query Items {
  items {
    id
    name
  }
}
    `;

export function useItemsQuery(options: Omit<Urql.UseQueryArgs<ItemsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ItemsQuery>({ query: ItemsDocument, ...options });
};