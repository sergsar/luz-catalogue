import { Collection } from "mongodb";
import client from "@luz-catalogue/app/services/mongo-client";

export const collections: { catalogue?: Collection } = {};

export const connectToDatabase = async () => {
  try {
    console.log("Connecting to Database");

    await client.connect();

    const db = client.db("vaelza_test");

    const catalogueCollection = db.collection("catalogue");

    collections.catalogue = catalogueCollection;

    console.log(
      `Successfully connected to database: ${db.databaseName} and collection: ${catalogueCollection.collectionName}`,
    );
  } catch (e) {
    console.error(e);
  }
};
