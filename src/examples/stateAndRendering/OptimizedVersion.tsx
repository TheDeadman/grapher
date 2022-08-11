import React, { useState } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";

const code = `import React, { useState } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";

function wait(ms: number) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}

let renderCount = 0;
const ChildComponent = ({ waitTime }: { waitTime: number; }) => {
    wait(waitTime);
    return (
        <div style={{ background: "green" }}>
            Child One has rendered {renderCount++} times
            <br />
        </div>
    );
};

let renderCountTwo = 0;
const ChildComponent2 = () => {

    const [childTwoClickCount, setChildTwoClickCount] = useState(0)
    return (
        <>
            <button onClick={() => setChildTwoClickCount(childTwoClickCount + 1)}>Increase Child 2 Click Count</button>
            <br />
            <div style={{ background: "blue" }}>
                Child Two has rendered {renderCountTwo++} times
                <br />
                Click Count: {childTwoClickCount}
            </div>
        </>
    );
};

export const OptimizedExample = () => {
    const [waitTime, setWaitTime] = useState(0)
    const [clickCount, setClickCount] = useState(0)
    return (
        <>
            Props vs State Optimized
            <br />
            <button onClick={() => waitTime === 0 ? setWaitTime(2000) : setWaitTime(0)}>{waitTime === 0 ? "Increase wait time" : "Decrease wait time"}</button>
            <br />
            <button onClick={() => setClickCount(clickCount + 1)}>Click Count - {clickCount}</button>
            < br />
            <ChildComponent waitTime={waitTime} />
            <br />
            <ChildComponent2 />
            <CodeBlock code={code} />
        </>
    );
}`

function wait(ms: number) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}

let renderCount = 0;
const ChildComponent = ({ waitTime }: { waitTime: number; }) => {
    wait(waitTime);
    return (
        <div style={{ background: "green" }}>
            Child One has rendered {renderCount++} times
            <br />
        </div>
    );
};

let renderCountTwo = 0;
const ChildComponent2 = () => {

    const [childTwoClickCount, setChildTwoClickCount] = useState(0)
    return (
        <>
            <button onClick={() => setChildTwoClickCount(childTwoClickCount + 1)}>Increase Child 2 Click Count</button>
            <br />
            <div style={{ background: "blue" }}>
                Child Two has rendered {renderCountTwo++} times
                <br />
                Click Count: {childTwoClickCount}
            </div>
        </>
    );
};

export const OptimizedExample = () => {
    const [waitTime, setWaitTime] = useState(0)
    const [clickCount, setClickCount] = useState(0)
    return (
        <>
            Props vs State Optimized
            <br />
            <button onClick={() => waitTime === 0 ? setWaitTime(2000) : setWaitTime(0)}>{waitTime === 0 ? "Increase wait time" : "Decrease wait time"}</button>
            <br />
            <button onClick={() => setClickCount(clickCount + 1)}>Click Count - {clickCount}</button>
            < br />
            <ChildComponent waitTime={waitTime} />
            <br />
            <ChildComponent2 />
            <CodeBlock code={code} />
        </>
    );
}