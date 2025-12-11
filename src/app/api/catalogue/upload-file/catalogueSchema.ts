import { number, object, ObjectSchema, string, ValidationError } from "yup";
import { CataloguePayload } from "@luz-catalogue/entities/Catalogue";

type CatalogueSchema = ObjectSchema<CataloguePayload>;

export const catalogueSchema: CatalogueSchema = object({
  code: string().trim().required(),
  description: string().trim().required().min(2),
  price: string()
    .trim()
    .required()
    .matches(/^\d+(\.\d{1,2})?$/, "Invalid decimal"),
  stock: number().integer().required(),
})
  .typeError("Expected an object")
  .noUnknown(true);

export const catalogueSafeValidate = async (value: unknown) => {
  try {
    const payload = await catalogueSchema.validate(value, {
      stripUnknown: false,
    });

    return { payload };
  } catch (e) {
    if (e instanceof ValidationError) {
      const row = typeof e.value === "object" ? `row "${e.value.code}"` : null;
      const path = e.path;
      const field = path ? `field "${path}"` : null;
      const value =
        typeof path === "string" && typeof e.value === "object"
          ? `"${e.value[path]}"`
          : null;

      return {
        errors: e.errors.map((message) =>
          [row, field, message, value].filter(Boolean).join(" "),
        ),
      };
    }

    return { errors: ["Unknown validation error"] };
  }
};

export const validateCatalogueItems = async (data: CataloguePayload[]) => {
  const validation = await Promise.all(
    data.map((item) => catalogueSafeValidate(item)),
  );

  const errors: string[] = validation
    .filter((item) => item.errors)
    .map((item) => item.errors!)
    .flat();
  const validated: CataloguePayload[] = validation
    .filter((item) => item.payload)
    .map((item) => item.payload!);

  return { validated, errors };
};
