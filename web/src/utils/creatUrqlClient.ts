import { dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";

export type MergeMode = "before" | "after";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  exchanges: [dedupExchange, cacheExchange(), ssrExchange, fetchExchange],
});
