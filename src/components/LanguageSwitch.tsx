"use client";

import { Box, IconButton } from "@mui/material";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useLocale, Locale } from "next-intl";

const LanguageSwitch = () => {
  const router = useRouter();
  const currentLocale = useLocale();

  const switchLocale = (locale: Locale) => {
    if (locale === currentLocale) {
      return;
    }

    setCookie("locale", locale, {
      path: "/",
      sameSite: "lax",
    });

    router.refresh(); // re-renders next-intl translations
  };

  return (
    <Box display="flex" gap={0.5}>
      <IconButton
        size="small"
        onClick={() => switchLocale("es")}
        sx={{ opacity: currentLocale === "es" ? 1 : 0.4 }}
      >
        🇪🇸
      </IconButton>
      <IconButton
        size="small"
        onClick={() => switchLocale("en")}
        sx={{ opacity: currentLocale === "en" ? 1 : 0.4 }}
      >
        🇬🇧
      </IconButton>
    </Box>
  );
};

export default LanguageSwitch;
