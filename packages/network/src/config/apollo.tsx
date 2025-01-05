"use client";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider as Provider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import axios from "axios";
import { ReactNode, useMemo } from "react";

export interface IApolloProviderProps {
  children: ReactNode;
}

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  // Validate environment variable
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("Environment variable NEXT_PUBLIC_API_URL is not defined.");
  }

  const httpLink = new HttpLink({
    uri: `${apiUrl}/graphql`,
  });

  const authLink = setContext(async (_, { headers }) => {
    try {
      const response = await axios.get<{ token?: string }>("/api/auth/token");
      const token = response.data;

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    } catch (error) {
      console.error("Error fetching auth token:", error);
      return {
        headers: {
          ...headers,
          authorization: "",
        },
      };
    }
  });

  const apolloClient = useMemo(
    () =>
      new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      }),
    [httpLink, authLink],
  );

  return <Provider client={apolloClient}>{children}</Provider>;
};
