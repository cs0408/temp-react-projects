import {
  Autocomplete,
  Button,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ButtonComponents, { ButtonComponent } from "./Buttons";

export const ShowCardOption = ({ editOption, option }) => {
  return (
    <>
      <Stack
        mt={2}
        direction="row"
        justifyContent="space-between"
        alignItems="end"
      >
        <Typography variant="h6" component="h2">
          {option.option}
        </Typography>
        <Button variant="outlined" onClick={editOption}>
          Edit
        </Button>
      </Stack>
      <Stack mt={2} direction="row">
        {option.values.map((value, index) => (
          <div key={index}>
            {value.value ? <Chip key={value} label={value.value} /> : <></>}
          </div>
        ))}
      </Stack>
    </>
  );
};

const Option = ({
  children,
  deleteOption,
  inputValue,
  handleInputField,
  saveOption,
  clearOption,
  index,
  error,
  optionTypes,
}) => {
  return (
    <>
      <Stack
        direction={{ sm: "row" }}
        spacing={{ sm: 1 }}
        justifyContent="space-between"
      >
        <TextField
          name="option"
          id="outlined-basic"
          label="Option name"
          variant="outlined"
          size="small"
          value={inputValue}
          onChange={(e) => handleInputField(e, index, null)}
          required
          error={error ? true : false}
          helperText={error ? error : ""}
          autoComplete="off"
        />
        <ButtonComponent
          variant="contained"
          onClick={deleteOption}
          title="Delete"
        />
      </Stack>
      {children}
      <ButtonComponents direction="row" spacing={2}>
        <ButtonComponent variant="outlined" onClick={saveOption} title="Done" />
        <ButtonComponent
          variant="outlined"
          onClick={clearOption}
          title="Clear"
        />
      </ButtonComponents>
    </>
  );
};

export default Option;
