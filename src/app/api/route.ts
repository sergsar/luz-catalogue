import {
  collections,
  connectToDatabase,
} from "@luz-catalogue/app/services/mongodb-service";
import parseError from "@luz-catalogue/app/utils/parseError";

export const GET = async () => {
  try {
    await connectToDatabase();

    const query = { code: "00000" };
    const catalogue = await collections.catalogue?.findOne(query);

    return Response.json({ catalogue });
  } catch (e) {
    const error = parseError(e);
    return Response.json({ error }, { status: 500 });
  }
};
