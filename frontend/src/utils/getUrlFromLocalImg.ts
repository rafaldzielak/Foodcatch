import { GRAPHQL_ENDPOINT } from "./consts";

export const getUrlForLocalImg = (localImg: string | undefined) => {
  if (localImg) return `${GRAPHQL_ENDPOINT}/images/${localImg}`;
  return "";
};
