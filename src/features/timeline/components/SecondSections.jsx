import { useMemo } from 'react';
import { useSelector } from "react-redux";
import { selectSecondWidthData } from "../timelineSlice";

export const SecondSections = () => {
    const secondWidthData = useSelector(selectSecondWidthData);

    const secondSectionMarkers = useMemo(() => {
        console.debug("SECONDSECTIONS")
        let sections = [];
        for (let i = 0; i < secondWidthData.sections; i++) {
            sections.push(
                <div
                    key={`seconds-marker-${i}`}
                    className="second-sections"
                    style={{ width: `${secondWidthData.width * 100}%` }}
                >
                    {i + 1}&nbsp;
                </div>
            );
        }
        return sections;
    }, [secondWidthData]);

    return (
        <div className="section-markers">
            {secondSectionMarkers}
            <div className="second-sections" style={{ flex: 1 }}>
                {secondWidthData.remainder}&nbsp;
            </div>
        </div>
    )
}