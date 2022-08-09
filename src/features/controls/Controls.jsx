import { TimeControls } from "./components/timeControls/TimeControls";
import { ButtonControls } from "./components/ButtonControls";
import './controls.css';

export const Controls = () => {
    return (
        <div className="controls">
            <TimeControls />
            <ButtonControls />
        </div>
    );
}