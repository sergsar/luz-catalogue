import client from "@luz-catalogue/services/mongo-client";

export const connectToDatabase = async () => {
  console.log("Connecting to Database");

  await client.connect();

  const db = client.db("vaelza");

  const catalogueCollection = db.collection("catalogue");

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${catalogueCollection.collectionName}`,
  );

  return { catalogue: catalogueCollection };
};
