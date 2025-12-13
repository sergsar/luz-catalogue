"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import LanguageSwitch from "@luz-catalogue/components/LanguageSwitch";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <Box component="header">
      <Box display="flex" justifyContent="space-between" padding={2}>
        <IconButton component={Link} href="/" aria-label="Home">
          <HomeIcon />
        </IconButton>
        <Box display="flex" flexDirection="row" gap={2}>
          <LanguageSwitch />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
