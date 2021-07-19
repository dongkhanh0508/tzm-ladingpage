import InputIcon from '@material-tailwind/react/InputIcon';
import { Box, Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { PaginationRequest } from 'models';
import React, { ChangeEvent } from 'react';

interface StudentFilterProps {
  filter: PaginationRequest;

  onChange?: (newFilter: PaginationRequest) => void;
  onSearchChange?: (newFilter: PaginationRequest) => void;
}

export default function StoreFilter({ filter, onChange, onSearchChange }: StudentFilterProps) {
  const handelSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter = {
      ...filter,
      keySearch: e.target.value,
    };
    onSearchChange(newFilter);
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            {/* <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="Search by name"
              endAdornment={<Search />}
              defaultValue={filter.name_like}
              labelWidth={60}
              onChange={handelSearchChange}
            /> */}
            <InputIcon
              type="text"
              color="lightBlue"
              size="regular"
              outline={true}
              placeholder="Outline Input with Icon"
              iconFamily="material-icons"
              iconName="search"
              onChange={handelSearchChange}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
