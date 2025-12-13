import { headers, cookies } from "next/headers";

const SUPPORTED_LOCALES = ["en", "es"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

const DEFAULT_LOCALE: Locale = "en";

export const getLocale = async () => {
  const nextCookies = await cookies();
  const locale = nextCookies.get("locale");
  if (locale && SUPPORTED_LOCALES.includes(locale.value as Locale)) {
    return locale.value as Locale;
  }

  const nextHeaders = await headers();
  const header = nextHeaders.get("accept-language");

  if (!header) {
    return DEFAULT_LOCALE;
  }

  const languages = header.split(",").map((l) => l.split(";")[0].trim());

  for (const lang of languages) {
    const base = lang.split("-")[0];
    if (SUPPORTED_LOCALES.includes(base as Locale)) {
      return base as Locale;
    }
  }

  return DEFAULT_LOCALE;
};
