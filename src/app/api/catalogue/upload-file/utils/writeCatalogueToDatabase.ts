import { CataloguePayload } from "@luz-catalogue/entities/Catalogue";
import { connectToDatabase } from "@luz-catalogue/services/mongodb-service";
import md5 from "@luz-catalogue/utils/md5";

const writeCatalogueToDatabase = async (data: CataloguePayload[]) => {
  const collections = await connectToDatabase();

  return collections.catalogue?.bulkWrite(
    data.map((item) => {
      const document_key = md5(Object.values(item).join("-"));
      return {
        updateOne: {
          filter: { code: item.code },
          update: [
            {
              $set: {
                ...item,
                price: { $toDecimal: item.price },
                document_key,
                updated_at: {
                  $cond: [
                    { $ne: ["$document_key", document_key] },
                    "$$NOW",
                    "$updated_at",
                  ],
                },
                created_at: { $ifNull: ["$created_at", "$$NOW"] },
              },
            },
          ],
          upsert: true,
        },
      };
    }),
  );
};

export default writeCatalogueToDatabase;
