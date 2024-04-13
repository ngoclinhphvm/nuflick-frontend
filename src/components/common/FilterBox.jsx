import { Select, MenuItem, FormHelperText, FormControl } from "@mui/material";

export default function FilterBox({ name, options }) {
  return (
    <FormControl>
      <FormHelperText>{name}</FormHelperText>
      <Select>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
