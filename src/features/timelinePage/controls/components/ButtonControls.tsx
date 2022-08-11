import { Button } from "@mui/material";
import { resetTimelineEntrys } from "features/timelineData/timelineSlice";
import { resetTimePositions } from "../timelineControlsSlice";
import { useAppDispatch } from "redux/hooks";

// EXAMPLE - 2 A
export const ButtonControls = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="control-buttons">
      <Button variant="outlined" onClick={() => dispatch(resetTimePositions())}>
        Reset Time
      </Button>
      <Button
        variant="outlined"
        onClick={() => dispatch(resetTimelineEntrys())}
      >
        Reset Entries
      </Button>
    </div>
  );
};

// EXAMPLE - 2 B
// export const ButtonControls = () => {
//     const dispatch = useAppDispatch();
//     const isCompareMode = useAppSelector(selectIsCompareMode);
//     const CompareButton = useMemo(() => {
//         return (<Button variant="outlined" onClick={() => dispatch(toggleCompareMode())}>
//             {!isCompareMode ? "Compare" : "List"}
//         </Button>)
//     }, [isCompareMode, dispatch, toggleCompareMode]);

//     const ResetButton = useMemo(() => (<Button
//         variant="outlined"
//         onClick={() =>
//             dispatch(
//                 setTimelineEntries({
//                     "Zebra Tablet": data,
//                     "Mac - Low End Device Mode": data2,
//                     Mac: data3,
//                 })
//             )
//         }
//     >
//         Reset Max Time
//     </Button>), [dispatch, setTimelineEntries])
//     return (
//         <div className="control-buttons">
//             {CompareButton}
//             {ResetButton}
//         </div>
//     )
// }
