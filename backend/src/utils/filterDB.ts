export type RegexFilter = {
  [key: string]: { $regex?: string | number; $options?: string } | number;
};

export type DateFilter = { date?: { $gte: Date } | { $lte: Date } };

export type IdFilter = {
  _id?: string;
};
