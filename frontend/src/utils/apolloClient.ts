import { setContext } from "@apollo/client/link/context";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const jwt = localStorage.getItem("jwt");

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: jwt ? `Bearer ${jwt}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ addTypename: false }),
});
