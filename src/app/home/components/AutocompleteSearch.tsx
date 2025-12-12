"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Paper, { PaperProps } from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// For the sake of this demo, we have to use debounce to reduce Google Maps Places API quote use
// But prefer to use throttle in practice
// import throttle from 'lodash/throttle';
import { debounce } from "@mui/material/utils";
import { useEffect, useLayoutEffect, useState } from "react";
import parseError from "@luz-catalogue/utils/parseError";
import { SearchItem } from "@luz-catalogue/app/api/catalogue/search/types";

type Props = {
  onSelect: (value: SearchItem | null) => void;
};

const CustomPaper = (props: PaperProps) => {
  return <Paper {...props}>{props.children}</Paper>;
};

const useEnhancedEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const search = debounce(
  async (
    input: string,
    callback: (results?: readonly SearchItem[]) => void,
  ) => {
    try {
      const response = await fetch(`/api/catalogue/search?value=${input}`);

      const data: { documents: readonly SearchItem[] } = await response.json();

      callback(data.documents);
    } catch (err) {
      const message = parseError(err);
      callback([{ code: "Error", description: message, stock: 0 }]);

      throw err;
    }
  },
  400,
);

const emptyOptions: readonly SearchItem[] = [];

const AutocompleteSearch = ({ onSelect }: Props) => {
  const [value, setValue] = useState<SearchItem | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly SearchItem[]>(emptyOptions);

  useEnhancedEffect(() => {
    if (inputValue === "") {
      setOptions(value ? [value] : emptyOptions);
      return undefined;
    }

    // Allow to resolve the out of order request resolution.
    let active = true;

    void search(inputValue, (results?: readonly SearchItem[]) => {
      if (!active) {
        return;
      }

      let newOptions: readonly SearchItem[] = [];

      if (results) {
        newOptions = results;

        if (value) {
          newOptions = [
            value,
            ...results.filter((result) => result.code !== value.code),
          ];
        }
      } else if (value) {
        newOptions = [value];
      }
      setOptions(newOptions);
    });

    return () => {
      active = false;
    };
  }, [value, inputValue]);

  return (
    <Autocomplete
      sx={{ width: 300 }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.code
      }
      filterOptions={(x) => x}
      slots={{
        paper: CustomPaper,
      }}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No items"
      onChange={(event, newValue: SearchItem | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        onSelect(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search an article" fullWidth />
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;

        return (
          <li key={key} {...optionProps}>
            <Grid container sx={{ alignItems: "center" }}>
              <Grid sx={{ wordWrap: "break-word" }}>
                <Box component="span" sx={{ fontWeight: "fontWeightBold" }}>
                  {option.code}
                </Box>
                {option.description ? (
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {option.description}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default AutocompleteSearch;
