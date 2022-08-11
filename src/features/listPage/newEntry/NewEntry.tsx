import React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  closeNewEntryForm,
  saveNewEntry,
  selectHasValidationError,
  selectNewEntryName,
  selectNewEntryPerformanceJson,
  setNewEntryName,
  setNewEntryPerformanceJson,
} from "../listPageSlice";

export const NewEntry = () => {
  const dispatch = useAppDispatch();
  const entryName = useAppSelector(selectNewEntryName);
  const performanceJson = useAppSelector(selectNewEntryPerformanceJson);
  const hasValidationError = useAppSelector(selectHasValidationError);
  return (
    <>
      <Box
        component="form"
        sx={{
          // '& .MuiTextField-root': { m: 1, width: '25ch' },
          "& .MuiTextField-root": { m: 1 },

          width: 500,
          maxWidth: "100%",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="Entry Name"
          value={entryName}
          error={hasValidationError.entryName}
          onChange={(e) => dispatch(setNewEntryName(e.target.value))}
        />
        <TextField
          spellCheck="false"
          fullWidth
          id="outlined-multiline-flexible"
          label="performance.measure JSON Array"
          multiline
          maxRows={10}
          error={hasValidationError.performanceJson}
          onChange={(e) => dispatch(setNewEntryPerformanceJson(e.target.value))}
          value={performanceJson}
        />
      </Box>
      <div className="list-page-buttons">
        <Button
          variant="outlined"
          disabled={
            hasValidationError.entryName || hasValidationError.performanceJson
          }
          onClick={() =>
            dispatch(
              saveNewEntry({
                entryName: entryName,
                performanceJsonString: performanceJson,
              })
            )
          }
        >
          Save Entry
        </Button>
        {/* <Button variant="outlined" disabled={hasValidationError.entryName || hasValidationError.performanceJson} onClick={() => dispatch(closeNewEntryForm())}>Save Entry</Button> */}
        <Button
          variant="outlined"
          onClick={() => dispatch(closeNewEntryForm())}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};
