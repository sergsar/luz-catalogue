import { getRequestConfig } from "next-intl/server";
import { getLocale, Locale } from "@luz-catalogue/utils/getLocale";
import messages from "messages/en.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof messages;
  }
}

export default getRequestConfig(async () => {
  const locale = await getLocale();

  return {
    locale,
    messages: (await import(`messages/${locale}.json`)).default,
  };
});
