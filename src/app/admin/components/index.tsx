"use client";

import { Box, LinearProgress } from "@mui/material";
import { SignedIn, UserButton } from "@clerk/nextjs";
import FileDropZone from "@luz-catalogue/app/admin/components/FileDropZone";
import { useCallback, useState } from "react";
import uploadFileApi from "@luz-catalogue/app/admin/utils/uploadFileApi";
import { UploadFileResponse } from "@luz-catalogue/app/api/catalogue/upload-file/types";
import ErrorList from "@luz-catalogue/app/admin/components/ErrorList";
import Typography from "node_modules/@mui/material/Typography";
import WriteResult from "@luz-catalogue/app/admin/components/WriteResult";

const Admin = () => {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadFileResponse>();

  const handleUpload = useCallback(async (files: File[]) => {
    if (files.length === 0) {
      return;
    }
    setResult(undefined);
    setUploading(true);
    const file = files[0];

    const result = await uploadFileApi(file);

    setUploading(false);
    setResult(result);

    setUploading(false);
  }, []);

  return (
    <Box component="main">
      <Box display="flex" flexDirection="column" padding={4} gap={2}>
        <Box display="flex" justifyContent="end">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center">
          {uploading ? <LinearProgress sx={{ width: "100%" }} /> : null}
          <FileDropZone onDrop={handleUpload} />
          {result?.data?.result ? (
            <WriteResult result={result.data.result} />
          ) : null}
          {result?.error ? (
            <Typography>Error: {result.error}</Typography>
          ) : null}
          {result?.data?.errors?.length ? (
            <ErrorList title="Validation Errors" errors={result.data.errors} />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
