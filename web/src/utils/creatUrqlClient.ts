import { dedupExchange, fetchExchange } from "urql";
import { cacheExchange, Resolver, Cache } from "@urql/exchange-graphcache";
import {
  DeleteItemMutationVariables,
  MutationDeleteItemArgs,
} from "../generated/graphql";

export type MergeMode = "before" | "after";

function invalidateAllPosts(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "items");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "items", fi.arguments || {});
  });
}

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          deleteItem: (_result, args, cache, info) => {
            cache.invalidate({
              __typename: "Item",
              id: (args as MutationDeleteItemArgs).id,
            });
          },
          createItem: (_result, args, cache, info) => {
            const allFields = cache.inspectFields("Query");
            const fieldInfos = allFields.filter(
              (info) => info.fieldName === "items"
            );
            fieldInfos.forEach((fi) => {
              cache.invalidate("Query", "items", fi.arguments);
            });
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
