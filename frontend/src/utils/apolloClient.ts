import { setContext } from "@apollo/client/link/context";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { GRAPHQL_ENDPOINT } from "./consts";

const jwt = localStorage.getItem("jwt");

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: jwt ? `Bearer ${jwt}` : "",
    },
  };
});

const httpLink = createUploadLink({ uri: `${GRAPHQL_ENDPOINT}/graphql` });

console.log(authLink.concat(httpLink));

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ addTypename: false }),
});
