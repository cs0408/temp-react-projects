import { Delete } from "@mui/icons-material";
import { Stack, TextField } from "@mui/material";

export const ValueDeleteButton = ({ deleteOptionValue }) => {
  return (
    <div onClick={deleteOptionValue}>
      <Delete />
    </div>
  );
};

// Value
const OptionValue = ({
  children,
  inputValue,
  handleInputField,
  index,
  optionIndex,
  error,
}) => {
  return (
    <Stack
      mt={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <TextField
        name="value"
        id="outlined-basic"
        label="Value"
        variant="outlined"
        size="small"
        value={inputValue}
        onChange={(e) => handleInputField(e, optionIndex, index)}
        required
        error={error ? true : false}
        helperText={error ? error : ""}
      />
      {children}
    </Stack>
  );
};

export default OptionValue;
