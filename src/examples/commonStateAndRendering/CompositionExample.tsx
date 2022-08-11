import React, { useState } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";

// start
const code = `import React, { useState } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";

function wait(ms: number) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}

const NameComponent = ({ name }: { name: string }) => {
    return (
        <div style={{ background: "black" }}>Hello, {name}</div>
    )
}


const ChildComponent = ({ waitTime, clickCount, name }: { waitTime: number; clickCount: number; name: string }) => {
    wait(waitTime);
    return (
        <div style={{ background: "green" }}>
            Child One - Click Count {clickCount}
            <br />
            <NameComponent name={name} />
            <br />
        </div>
    );
};

let renderCountTwo = 0;
const ChildComponent2 = ({ clickCount, clickCountTwo, name }: { clickCount: number, clickCountTwo: number; name: string }) => {
    return (
        <div style={{ background: "blue" }}>
            <br />
            <NameComponent name={name} />
            <br />
            Rendered {renderCountTwo++} times
            <br />
            Click Count: {clickCount}
            <br />
            Click Count Two: {clickCountTwo}
        </div>
    );
};

const ChildSet = ({ name, clickCount }: { name: string, clickCount: number }) => {
    const [clickCountTwo, setClickCountTwo] = useState(0)

    return (
        <>
            <button onClick={() => setClickCountTwo(clickCountTwo + 1)}>Increase Click Count Two</button>
            <br />
            <div style={{ display: 'flex' }}>
                <ChildComponent2 name={name} clickCount={clickCount} clickCountTwo={clickCountTwo} />
                &nbsp;&nbsp;&nbsp;
                <ChildComponent2 name={name} clickCount={clickCount} clickCountTwo={clickCountTwo} />
            </div>
        </>
    )
}

export const CompositionExample = () => {
    const [waitTime, setWaitTime] = useState(0)
    const [waitTimeField, setWaitTimeField] = useState('200')
    const [clickCount, setClickCount] = useState(0);
    const [name, setName] = useState('')
    return (
        <>
            Props vs State Composition
            <br />

            <input value={waitTimeField} type="number" id="fname" name="fname" onChange={(e) => setWaitTimeField(e.target.value)} />
            <button onClick={() => waitTime === 0 ? setWaitTime(parseInt(waitTimeField)) : setWaitTime(0)}>{waitTime === 0 ? "Increase wait time" : "Decrease wait time"}</button>

            <br />

            <label>Name:</label>
            <input value={name} type="text" id="fname" name="fname" onChange={(e) => setName(e.target.value)} />
            <button onClick={() => setClickCount(clickCount + 1)}>Increase Click Count</button>

            < br />

            <ChildComponent waitTime={waitTime} name={name} clickCount={clickCount} />

            <br />

            <ChildSet clickCount={clickCount} name={name} />
            <CodeBlock code={code} />
        </>
    );
}`
// end
function wait(ms: number) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}

const NameComponent = ({ name }: { name: string }) => {
    return (
        <div style={{ background: "black" }}>Hello, {name}</div>
    )
}


const ChildComponent = ({ waitTime, clickCount, name }: { waitTime: number; clickCount: number; name: string }) => {
    wait(waitTime);
    return (
        <div style={{ background: "green" }}>
            Child One - Click Count {clickCount}
            <br />
            <NameComponent name={name} />
            <br />
        </div>
    );
};

let renderCountTwo = 0;
const ChildComponent2 = ({ clickCount, clickCountTwo, name }: { clickCount: number, clickCountTwo: number; name: string }) => {
    return (
        <div style={{ background: "blue" }}>
            <br />
            <NameComponent name={name} />
            <br />
            Rendered {renderCountTwo++} times
            <br />
            Click Count: {clickCount}
            <br />
            Click Count Two: {clickCountTwo}
        </div>
    );
};

const ChildSet = ({ name, clickCount }: { name: string, clickCount: number }) => {
    const [clickCountTwo, setClickCountTwo] = useState(0)

    return (
        <>
            <button onClick={() => setClickCountTwo(clickCountTwo + 1)}>Increase Click Count Two</button>
            <br />
            <div style={{ display: 'flex' }}>
                <ChildComponent2 name={name} clickCount={clickCount} clickCountTwo={clickCountTwo} />
                &nbsp;&nbsp;&nbsp;
                <ChildComponent2 name={name} clickCount={clickCount} clickCountTwo={clickCountTwo} />
            </div>
        </>
    )
}

export const CompositionExample = () => {
    const [waitTime, setWaitTime] = useState(0)
    const [waitTimeField, setWaitTimeField] = useState('200')
    const [clickCount, setClickCount] = useState(0);
    const [name, setName] = useState('')
    return (
        <>
            Props vs State Composition
            <br />

            <input value={waitTimeField} type="number" id="fname" name="fname" onChange={(e) => setWaitTimeField(e.target.value)} />
            <button onClick={() => waitTime === 0 ? setWaitTime(parseInt(waitTimeField)) : setWaitTime(0)}>{waitTime === 0 ? "Increase wait time" : "Decrease wait time"}</button>

            <br />

            <label>Name:</label>
            <input value={name} type="text" id="fname" name="fname" onChange={(e) => setName(e.target.value)} />
            <button onClick={() => setClickCount(clickCount + 1)}>Increase Click Count</button>

            < br />

            <ChildComponent waitTime={waitTime} name={name} clickCount={clickCount} />

            <br />

            <ChildSet clickCount={clickCount} name={name} />
            <CodeBlock code={code} />
        </>
    );
}