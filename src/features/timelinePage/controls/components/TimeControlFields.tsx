import TextField from "@mui/material/TextField";
import {
  setMaxTime,
  setMinTime,
  selectMinTime,
  selectMaxTime,
  selectBaseMaxTime,
} from "features/timelineData/timelineSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export const TimeControlFields = () => {
  const dispatch = useAppDispatch();
  const minTime = useAppSelector(selectMinTime);
  const maxTime = useAppSelector(selectMaxTime);
  const baseMaxTime = useAppSelector(selectBaseMaxTime);

  return (
    <div>
      <TextField
        type="number"
        id="outlined-basic"
        label="Min Time:"
        value={minTime}
        onChange={(e) =>
          e.target.value ? dispatch(setMinTime(parseInt(e.target.value))) : 0
        }
        variant="filled"
      />
      &nbsp;&nbsp;&nbsp;
      <TextField
        type="number"
        id="outlined-basic"
        label="Max Time:"
        value={maxTime}
        onChange={(e) => {
          console.log("???", e.target.value);
          if (e.target.value) {
            dispatch(
              setMaxTime({
                maxTime: parseInt(e.target.value),
                baseMaxTime: baseMaxTime,
              })
            );
          }
        }}
        variant="filled"
      />
    </div>
  );
};
