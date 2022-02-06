export type regexFilter = {
  [key: string]: { $regex: string; $options?: string };
};

export type idFilter = {
  _id: string;
};
