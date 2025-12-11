import { Box, styled, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

type Props = {
  onDrop: (file: File[]) => void;
};

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types/Common_types
const mimeTypes = {
  "application/vnd.ms-excel": [".xls"],
};

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  overflow: "hidden",
  position: "relative",
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.grey[500]}`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
  height: "100%",
}));

const FileDropZone = ({ onDrop }: Props) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    accept: { ...mimeTypes },
    multiple: false,
    onDrop,
  });

  return (
    <DropZoneStyle
      {...getRootProps()}
      sx={{
        ...(isDragActive && { opacity: 0.72 }),
        ...((isDragReject || fileRejections.length > 0) && {
          color: "error.main",
          borderColor: "error.light",
          backgroundColor: "error.lighter",
        }),
      }}
    >
      <input {...getInputProps()} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label="upload dropzone area"
      >
        <Typography variant="body1" align="center">
          Click or drag to upload the file
        </Typography>
        {Object.keys(mimeTypes).length > 0 && (
          <Typography variant="body2" align="center">
            Supported file types: xls
          </Typography>
        )}
      </Box>
    </DropZoneStyle>
  );
};

export default FileDropZone;
