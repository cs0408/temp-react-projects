import { Button, Stack } from "@mui/material";

export const ButtonComponent = ({ variant, onClick, title }) => {
  return (
    <Button variant={variant} onClick={onClick}>
      {title}
    </Button>
  );
};

const ButtonComponents = ({ direction, spacing, children }) => {
  return (
    <Stack mt={3} direction={direction} spacing={spacing}>
      {children}
    </Stack>
  );
};
export default ButtonComponents;
