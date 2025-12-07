import { ObjectId } from "mongodb";

export default class Catalogue {
  constructor(
    public id: ObjectId,
    public code: string,
    public description: string,
    public price: number,
    public stock: number,

    public created_at: Date,
    public updated_at: Date,
  ) {}
}
