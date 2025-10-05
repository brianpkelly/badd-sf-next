"use client";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { ReactNode, useMemo } from "react";

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "http://badd-dev.local/graphql", // WPGraphQL endpoint
    }),
    cache: new InMemoryCache(),
  });
}

export default function ApolloWrapper({ children }: { children: ReactNode }) {
  const apolloClient = useMemo(() => createApolloClient(), []);

  console.log("ApolloClient instance:", apolloClient);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
