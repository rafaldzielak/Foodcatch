import { DateFilter, IdFilter, RegexFilter } from "../utils/filterDB";
import fs from "fs";
import multer from "multer";

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

const upload = multer({ dest: "C:/Users/RD/Desktop/Kursy/react_workspace/foodcatch/backend/public" });

export const storeFS = async (image: any) => {
  const { filename, createReadStream } = await image;
  console.log(filename, createReadStream);
  console.log(image);
  const stream = createReadStream();
  console.log(stream);

  const uploadDir = "public/images";
  const extension = filename.split(".").pop();
  const newFileName = `${Date.now()}.${extension}`;
  const path = `${uploadDir}/${newFileName}`;
  console.log(path);
  // upload.single("file");
  // console.log("BUFFER:");
  // console.log(image.buffer);
  console.log(stream._readableState.buffer);

  // fs.writeFileSync(
  //   "C:/Users/RD/Desktop/Kursy/react_workspace/foodcatch/backend/public/images",
  //   stream._readableState.buffer
  // );
  console.log("AJSJHSD");

  return new Promise((resolve, reject) =>
    stream
      .on("error", (error: any) => {
        if (stream.truncated)
          // delete the truncated file
          fs.unlinkSync(path);
        console.log("TRUNCATED");

        reject(error);
      })
      .pipe(console.log("AAA"))
      .pipe(fs.createWriteStream(path))
      .pipe(console.log("BBB"))
      .on("error", (error: any) => {
        console.log("error");
        reject(error);
      })
      .on("finish", () => {
        console.log("FINISH");
        resolve(newFileName);
      })
  );
};
