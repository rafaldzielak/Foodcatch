import { IdFilter, RegexFilter } from "../utils/filterDB";

export const getFilter = (args: any[any]) => {
  const filter: RegexFilter | IdFilter = {};

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
