import React, { useState } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { setName, selectName } from './reduxExampleSlice';

// start
const code = `// ReduxExample.tsx
import React, { useState } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { setName, selectName } from './reduxExampleSlice';

function wait(ms: number) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}

const NameComponent = () => {
    const name = useAppSelector(selectName)
    return (
        <div style={{ background: "black" }}>Hello, {name}</div>
    )
}


const ChildComponent = ({ waitTime, clickCount }: { waitTime: number; clickCount: number; }) => {
    wait(waitTime);
    return (
        <div style={{ background: "green" }}>
            Child One - Click Count {clickCount}
            <br />
            <NameComponent />
            <br />
        </div>
    );
};

let renderCountTwo = 0;
const ChildComponent2 = ({ clickCount, clickCountTwo }: { clickCount: number, clickCountTwo: number }) => {
    return (
        <div style={{ background: "blue" }}>
            <br />
            <NameComponent />
            <br />
            Rendered {renderCountTwo++} times
            <br />
            Click Count: {clickCount}
            <br />
            Click Count Two: {clickCountTwo}
        </div>
    );
};

const ChildSet = ({ clickCount }: { clickCount: number }) => {
    const [clickCountTwo, setClickCountTwo] = useState(0)

    return (
        <>
            <button onClick={() => setClickCountTwo(clickCountTwo + 1)}>Increase Click Count Two</button>
            <br />
            <div style={{ display: 'flex' }}>
                <ChildComponent2 clickCount={clickCount} clickCountTwo={clickCountTwo} />
                &nbsp;&nbsp;&nbsp;
                <ChildComponent2 clickCount={clickCount} clickCountTwo={clickCountTwo} />
            </div>
        </>
    )
}

export const ReduxExample = () => {
    const dispatch = useAppDispatch();
    const [waitTime, setWaitTime] = useState(0)
    const [waitTimeField, setWaitTimeField] = useState('200')
    const [clickCount, setClickCount] = useState(0);
    return (
        <>
            Props vs State Composition
            <br />

            <input value={waitTimeField} type="number" id="fname" name="fname" onChange={(e) => setWaitTimeField(e.target.value)} />
            <button onClick={() => waitTime === 0 ? setWaitTime(parseInt(waitTimeField)) : setWaitTime(0)}>{waitTime === 0 ? "Increase wait time" : "Decrease wait time"}</button>

            <br />

            <label>Name:</label>
            <input type="text" id="fname" name="fname" onChange={(e) => {
                dispatch(setName(e.target.value))
                return e.target.value
            }}
            />
            <button onClick={() => setClickCount(clickCount + 1)}>Increase Click Count</button>

            < br />

            <ChildComponent waitTime={waitTime} clickCount={clickCount} />

            <br />

            <ChildSet clickCount={clickCount} />
            <CodeBlock code={code} />
            <CodeBlock code={sliceCode} />
        </>
    );
}`

const sliceCode = `// reduxExampleSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

const initialState = {
    name: '',
};

export const reduxExampleSlice = createSlice({
    name: "reduxExample",
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        }
    },
});

export const { setName } = reduxExampleSlice.actions;

export const selectName = (state: RootState) =>
    state.reduxExample.name;

export default reduxExampleSlice.reducer;`
// end

function wait(ms: number) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}

const NameComponent = () => {
    const name = useAppSelector(selectName)
    return (
        <div style={{ background: "black" }}>Hello, {name}</div>
    )
}


const ChildComponent = ({ waitTime, clickCount }: { waitTime: number; clickCount: number; }) => {
    wait(waitTime);
    return (
        <div style={{ background: "green" }}>
            Child One - Click Count {clickCount}
            <br />
            <NameComponent />
            <br />
        </div>
    );
};

let renderCountTwo = 0;
const ChildComponent2 = ({ clickCount, clickCountTwo }: { clickCount: number, clickCountTwo: number }) => {
    return (
        <div style={{ background: "blue" }}>
            <br />
            <NameComponent />
            <br />
            Rendered {renderCountTwo++} times
            <br />
            Click Count: {clickCount}
            <br />
            Click Count Two: {clickCountTwo}
        </div>
    );
};

const ChildSet = ({ clickCount }: { clickCount: number }) => {
    const [clickCountTwo, setClickCountTwo] = useState(0)

    return (
        <>
            <button onClick={() => setClickCountTwo(clickCountTwo + 1)}>Increase Click Count Two</button>
            <br />
            <div style={{ display: 'flex' }}>
                <ChildComponent2 clickCount={clickCount} clickCountTwo={clickCountTwo} />
                &nbsp;&nbsp;&nbsp;
                <ChildComponent2 clickCount={clickCount} clickCountTwo={clickCountTwo} />
            </div>
        </>
    )
}

export const ReduxExample = () => {
    const dispatch = useAppDispatch();
    const [waitTime, setWaitTime] = useState(0)
    const [waitTimeField, setWaitTimeField] = useState('200')
    const [clickCount, setClickCount] = useState(0);
    return (
        <>
            Props vs State Composition
            <br />

            <input value={waitTimeField} type="number" id="fname" name="fname" onChange={(e) => setWaitTimeField(e.target.value)} />
            <button onClick={() => waitTime === 0 ? setWaitTime(parseInt(waitTimeField)) : setWaitTime(0)}>{waitTime === 0 ? "Increase wait time" : "Decrease wait time"}</button>

            <br />

            <label>Name:</label>
            <input type="text" id="fname" name="fname" onChange={(e) => {
                dispatch(setName(e.target.value))
                return e.target.value
            }}
            />
            <button onClick={() => setClickCount(clickCount + 1)}>Increase Click Count</button>

            < br />

            <ChildComponent waitTime={waitTime} clickCount={clickCount} />

            <br />

            <ChildSet clickCount={clickCount} />
            <CodeBlock code={code} />
            <CodeBlock code={sliceCode} />
        </>
    );
}