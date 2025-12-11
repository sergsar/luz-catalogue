import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItem from "node_modules/@mui/material/ListItem";

type Props = {
  errors: string[];
  title: string;
};

const ErrorList = ({ title, errors }: Props) => {
  return (
    <Box>
      <Typography>{title}</Typography>
      <List sx={{ height: 300, overflow: "auto" }}>
        {errors.map((error, index) => (
          <ListItem key={`error-list-item${index}`}>
            <ListItemText id={`error-list-item${index}`} primary={error} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ErrorList;
