import * as React from "react";
import { alpha } from "@mui/material/styles";
import {
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  TextField,
} from "@mui/material";
import { Delete, FilterList } from "@mui/icons-material";
import _ from "lodash";

interface EnhancedTableToolbarProps {
  numSelected: number;
  setQuery: (query: string) => void;
  query: string;
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, query, setQuery } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  };

  const debouncedChangeHandler = React.useCallback(
    _.debounce(handleChange, 1000),
    []
  );

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Data
        </Typography>
      )}
      <TextField
        size="small"
        sx={{ bgcolor: "white" }}
        onChange={debouncedChangeHandler}
        defaultValue={query}
      />
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Delete />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterList />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
