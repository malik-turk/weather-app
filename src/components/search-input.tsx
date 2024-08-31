import React, { useState, useMemo } from "react";
import TextField from "@mui/material/TextField";
import debounce from "lodash.debounce";

interface SearchInputProps {
  onSearch: (city: string) => void;
  isDisabled: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isDisabled }) => {
  const [inputValue, setInputValue] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearch(value);
      }, 500),
    [onSearch]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  return (
    <TextField
      sx={{
        margin: "20px 0",
        backgroundColor: "white",
        borderRadius: 4,
        overflow: "hidden",
      }}
      fullWidth
      label="Search for a city"
      variant="filled"
      value={inputValue}
      disabled={isDisabled}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
