export type RegexFilter = {
  [key: string]: { $regex: string | number; $options?: string } | number;
};

export type IdFilter = {
  _id: string;
};
