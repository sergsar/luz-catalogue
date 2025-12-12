import { connectToDatabase } from "@luz-catalogue/services/mongodb-service";
import parseError from "@luz-catalogue/utils/parseError";
import { NextRequest } from "next/server";
import { SearchItem } from "@luz-catalogue/app/api/catalogue/search/types";

export const GET = async (req: NextRequest) => {
  try {
    const value = req.nextUrl.searchParams.get("value");
    const collections = await connectToDatabase();

    const documents = await collections.catalogue
      .aggregate<SearchItem>([
        {
          $search: {
            index: "vaelza_catalogue",
            autocomplete: {
              query: value,
              path: "code",
              fuzzy: { maxEdits: 2, prefixLength: 1, maxExpansions: 256 },
            },
          },
        },
        {
          $match: {
            stock: { $gt: 0 },
          },
        },
        {
          $project: {
            _id: 1,
            code: 1,
            description: 1,
            stock: 1,
          },
        },
      ])
      .limit(50)
      .toArray();

    return Response.json({ documents });
  } catch (e) {
    const error = parseError(e);
    return Response.json({ error }, { status: 500 });
  }
};
