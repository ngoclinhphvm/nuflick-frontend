import { Select, MenuItem, FormHelperText, FormControl } from "@mui/material";

export default function FilterBox({ title, options, onOptionChange }) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <FormControl>
      <FormHelperText>{title}</FormHelperText>
      <Select
        MenuProps={MenuProps}
        onChange={(event) => onOptionChange(event.target.value)}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
