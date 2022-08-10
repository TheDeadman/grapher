import { useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@mui/material";
import { toggleCompareMode, selectIsCompareMode, resetTimelineEntrys } from "../../../timelineData/timelineSlice";
import { resetTimePositions } from './timeControls/timeControlsSlice';


// EXAMPLE - 2 A
export const ButtonControls = () => {
    const dispatch = useDispatch();
    const isCompareMode = useSelector(selectIsCompareMode);

    return (
        <div className="control-buttons">
            <Button variant="outlined" onClick={() => dispatch(resetTimePositions())}>
                Reset Time
            </Button>
            <Button
                variant="outlined"
                onClick={() =>
                    dispatch(
                        resetTimelineEntrys()
                    )
                }
            >
                Reset Entries
            </Button>
        </div>
    )
}

// EXAMPLE - 2 B
// export const ButtonControls = () => {
//     const dispatch = useDispatch();
//     const isCompareMode = useSelector(selectIsCompareMode);
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