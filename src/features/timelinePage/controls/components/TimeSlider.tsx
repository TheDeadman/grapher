import { MouseEvent, MutableRefObject, useRef } from "react";
import Box from "@mui/material/Box";
import {
  selectIsMovingMaxPosition,
  selectIsMovingMinPosition,
  selectTimePositions,
  setIsMovingMaxPosition,
  setIsMovingMinPosition,
  setMaxTimePosition,
  setMinTimePosition,
} from "features/timelinePage/controls/timelineControlsSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export const TimeSlider = () => {
  const boxRef = useRef<HTMLDivElement>(
    null
  ) as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { minTimePosition, maxTimePosition } =
    useAppSelector(selectTimePositions);
  const isMovingMinPosition = useAppSelector(selectIsMovingMinPosition);
  const isMovingMaxPosition = useAppSelector(selectIsMovingMaxPosition);

  const trackMousePosition = (e: MouseEvent) => {
    if (isMovingMaxPosition) {
      console.log(e);

      console.log("EEEE", e.pageX, e.screenX, boxRef.current.offsetLeft);
      const percent =
        ((e.pageX - boxRef.current?.offsetLeft) / boxRef.current?.offsetWidth) *
        100;
      console.log(
        "EEEE",
        e.pageX,
        e.screenX,
        boxRef.current.offsetLeft,
        boxRef.current.offsetWidth,
        percent
      );

      dispatch(setMaxTimePosition(percent > 99.25 ? 100 : percent));
    } else if (isMovingMinPosition) {
      console.log("EEEE", e.pageX, e.screenX, boxRef.current.offsetLeft);
      const percent =
        ((e.pageX - boxRef.current.offsetLeft) / boxRef.current.offsetWidth) *
        100;
      console.log(
        "EEEE",
        e.pageX,
        e.screenX,
        boxRef.current.offsetLeft,
        boxRef.current.offsetWidth,
        percent
      );

      dispatch(setMinTimePosition(percent < 0.25 ? 0 : percent));
    }
  };

  return (
    <div
      className="time-slider"
      onMouseMove={trackMousePosition}
      onMouseUp={() => {
        dispatch(setIsMovingMinPosition(false));
        dispatch(setIsMovingMaxPosition(false));
      }}
      onMouseLeave={() => {
        dispatch(setIsMovingMinPosition(false));
        dispatch(setIsMovingMaxPosition(false));
      }}
      ref={boxRef}
    >
      <Box
        sx={{
          width: `calc(${minTimePosition}% - 4px)`,
          height: 40,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
          borderRight: "thin solid black",
        }}
      />
      <Box
        sx={{
          width: 2,
          height: 40,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
          borderRight: "thin solid black",
          cursor: "ew-resize",
        }}
        onMouseDown={() => dispatch(setIsMovingMinPosition(true))}
      />
      <Box
        sx={{
          width: `calc(${maxTimePosition - minTimePosition}% - 4px)`,
          height: 40,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
          borderRight: "thin solid black",
        }}
      />
      <Box
        sx={{
          width: 2,
          height: 40,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
          borderRight: "thin solid black",
          cursor: "ew-resize",
        }}
        onMouseDown={() => dispatch(setIsMovingMaxPosition(true))}
        onMouseUp={() => dispatch(setIsMovingMaxPosition(false))}
      />
      <Box
        sx={{
          width: `calc(${100 - maxTimePosition}% - 4px)`,
          height: 40,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      />
    </div>
  );
};
