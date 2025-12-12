import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertProps } from "@mui/material/Alert";

export type Message = {
  text: string;
  severity: AlertProps["severity"];
};

type Props = {
  message?: Message;
  onClose: () => void;
};

export const MessageBar = ({ message, onClose }: Props) => {
  return (
    <Snackbar
      open={!!message}
      autoHideDuration={6000}
      onClose={onClose}
      message={message?.text}
    >
      <Alert
        onClose={onClose}
        severity={message?.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message?.text}
      </Alert>
    </Snackbar>
  );
};
