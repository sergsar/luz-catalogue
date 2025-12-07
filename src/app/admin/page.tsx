import { Box } from "@mui/material";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default function AdminDashboard() {
  return (
    <Box component="main">
      <Box display="flex" padding={4} justifyContent="end">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Box>
    </Box>
  );
}
