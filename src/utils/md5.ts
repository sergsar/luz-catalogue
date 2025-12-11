import { BinaryLike, createHash } from "crypto";

const md5 = (data: BinaryLike) => {
  return createHash("md5").update(data).digest("hex");
};

export default md5;
