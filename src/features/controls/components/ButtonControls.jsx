import { useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@mui/material";
import { toggleCompareMode, setTimelineEntries, selectIsCompareMode } from "../../timeline/timelineSlice";

import data from "../../timeline/data/data";
import data2 from "../../timeline/data/data2";
import data3 from "../../timeline/data/data3";

import data4 from "../../timeline/data/data4";
import data5 from "../../timeline/data/data5";
import data6 from "../../timeline/data/data6";

// EXAMPLE - 2 A
export const ButtonControls = () => {
    const dispatch = useDispatch();
    const isCompareMode = useSelector(selectIsCompareMode);

    return (
        <div className="control-buttons">
            <Button variant="outlined" onClick={() => dispatch(toggleCompareMode())}>
                {!isCompareMode ? "Compare" : "List"}
            </Button>
            <Button
                variant="outlined"
                onClick={() =>
                    dispatch(
                        setTimelineEntries({
                            "Zebra Tablet": data,
                            "Mac - Low End Device Mode": data2,
                            Mac: data3,
                        })
                    )
                }
            >
                Reset
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