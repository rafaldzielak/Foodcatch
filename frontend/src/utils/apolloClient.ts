import { setContext } from "@apollo/client/link/context";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const authLink = setContext((_, { headers }) => {
  const jwt = localStorage.getItem("jwt");

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
