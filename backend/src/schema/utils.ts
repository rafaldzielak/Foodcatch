import { DateFilter, IdFilter, RegexFilter } from "../utils/filterDB";

export const getFilter = (args: any[any]): RegexFilter & IdFilter & DateFilter => {
  const filter: RegexFilter & IdFilter & DateFilter = {};

  for (const [filterKey, filterValue] of Object.entries(args)) {
    if (!filterValue || filterKey === "page") continue;
    if (filterKey === "id") {
      filter._id = args.id;
      continue;
    }
    if (typeof filterValue === "string") filter[filterKey] = { $regex: filterValue as string, $options: "i" };
    if (typeof filterValue === "number") filter[filterKey] = filterValue;
  }
  return filter;
};

export const checkAuthorization = (req: any) => {
  if (!req.isAdmin) throw new Error("You are not logged in as an admin!");
};
