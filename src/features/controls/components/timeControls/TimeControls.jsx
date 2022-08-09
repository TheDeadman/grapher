import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { selectIsMovingMaxPosition, selectIsMovingMinPosition, selectTimePositions, setIsMovingMaxPosition, setIsMovingMinPosition, setMaxTimePosition, setMinTimePosition } from "./timeControlsSlice";
import { setMaxTime, setMinTime, selectMinTime, selectMaxTime, selectBaseMaxTime } from "../../../timeline/timelineSlice";

const TimeSlider = () => {
    const boxRef = useRef();
    const dispatch = useDispatch();
    const { minTimePosition, maxTimePosition } = useSelector(selectTimePositions);
    const isMovingMinPosition = useSelector(selectIsMovingMinPosition);
    const isMovingMaxPosition = useSelector(selectIsMovingMaxPosition);

    const trackMousePosition = (e) => {
        console.log(boxRef.current)
        if (isMovingMaxPosition) {
            console.log(e)

            console.log("EEEE", e.pageX, e.screenX, boxRef.current.offsetLeft);
            const percent = ((e.pageX - boxRef.current.offsetLeft) / boxRef.current.offsetWidth) * 100;
            console.log("EEEE", e.pageX, e.screenX, boxRef.current.offsetLeft, boxRef.current.offsetWidth, percent);

            dispatch(setMaxTimePosition(percent > 99.25 ? 100 : percent));
        } else if (isMovingMinPosition) {
            console.log("EEEE", e.pageX, e.screenX, boxRef.current.offsetLeft);
            const percent = ((e.pageX - boxRef.current.offsetLeft) / boxRef.current.offsetWidth) * 100;
            console.log("EEEE", e.pageX, e.screenX, boxRef.current.offsetLeft, boxRef.current.offsetWidth, percent);

            dispatch(setMinTimePosition(percent < 0.25 ? 0 : percent));
        }
    }

    return (
        <div
            className="time-slider"
            onMouseMove={trackMousePosition}
            onMouseUp={() => {
                dispatch(setIsMovingMinPosition(false))
                dispatch(setIsMovingMaxPosition(false))
            }}
            onMouseLeave={() => {
                dispatch(setIsMovingMinPosition(false))
                dispatch(setIsMovingMaxPosition(false))
            }}
            ref={boxRef}
        >
            <Box
                sx={{
                    width: `calc(${minTimePosition}% - 4px)`,
                    height: 40,
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                    borderRight: 'thin solid black'
                }}
            />
            <Box
                sx={{
                    width: 2,
                    height: 40,
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                    borderRight: 'thin solid black',
                    cursor: 'ew-resize'
                }}
                onMouseDown={() => dispatch(setIsMovingMinPosition(true))}
            />
            <Box
                sx={{
                    width: `calc(${maxTimePosition - minTimePosition}% - 4px)`,
                    height: 40,
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                    borderRight: 'thin solid black'
                }}
            />
            <Box
                sx={{
                    width: 2,
                    height: 40,
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                    borderRight: 'thin solid black',
                    cursor: 'ew-resize',
                }}
                onMouseDown={() => dispatch(setIsMovingMaxPosition(true))}
                onMouseUp={() => dispatch(setIsMovingMaxPosition(false))}
            />
            <Box
                sx={{
                    width: `calc(${100 - maxTimePosition}% - 4px)`,
                    height: 40,
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            />
        </div>
    )
}

export const TimeControls = () => {
    const dispatch = useDispatch();
    const minTime = useSelector(selectMinTime);
    const maxTime = useSelector(selectMaxTime);
    const baseMaxTime = useSelector(selectBaseMaxTime);

    return (
        <>
            <div>
                <TextField
                    type="number"
                    id="outlined-basic"
                    label="Min Time:"
                    value={minTime}
                    onChange={(e) =>
                        e.target.value
                            ? dispatch(setMinTime(parseInt(e.target.value)))
                            : 0
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
                        console.log("???", e.target.value)
                        if (e.target.value) {
                            dispatch(setMaxTime({ maxTime: parseInt(e.target.value), baseMaxTime: baseMaxTime }))
                        } 
                    }}
                    variant="filled"
                />
                {/* <label>Min Time: </label>
        <input
            type="number"
            id="fname"
            name="fname"
            onChange={(e) =>
                e.target.value
                    ? dispatch(setMinTime(parseInt(e.target.value)))
                    : 0
            }
        />
        &nbsp;&nbsp;&nbsp;
        <label>Max Time:</label>
        <input
            type="number"
            id="fname"
            name="fname"
            onChange={(e) =>
                e.target.value
                    ? dispatch(setMaxTime(parseInt(e.target.value)))
                    : 0
            }
        /> */}
            </div>
            <TimeSlider />
        </>
    )
}