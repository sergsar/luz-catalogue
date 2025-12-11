import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BulkWriteResult } from "mongodb";

type Props = { result: BulkWriteResult };

const WriteResult = ({ result }: Props) => {
  return (
    <Box display="flex" flexDirection="row" gap={2} justifyContent="center">
      <Typography>Added {result.upsertedCount}</Typography>
      <Typography>Matched {result.matchedCount}</Typography>
      <Typography>Modified {result.modifiedCount}</Typography>
    </Box>
  );
};

export default WriteResult;
