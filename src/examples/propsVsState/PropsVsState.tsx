import React, { ReactNode, useState } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";

const code = `import React, { ReactNode, useState } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";

const ChildComponent = ({ text }: { text: string }) => {
  return (
    <div style={{ background: "green" }}>
      This is the child component.
      <br />
      {text}
    </div>
  );
};

const ChildComponent2 = ({ isShowingNestedComponent }: { isShowingNestedComponent: boolean }) => {
  return (
    <div style={{ background: "blue" }}>
      This is the second child component.
      <br />
      {isShowingNestedComponent && <ChildComponent3 />}
    </div>
  );
};

const ChildComponent3 = () => {
  return (<div>This is child component 3</div>)
}

let isShowingNestedComponent = false;
export const PropsVsStateExample = () => {
  const [clickCount, setClickCount] = useState(0)
  return (
    <>
      Props vs State
      <br />
      <br />
      <button onClick={() => isShowingNestedComponent = !isShowingNestedComponent}>Toggle Nested Component</button>
      <br />
      <button onClick={() => setClickCount(clickCount + 1)}>CLICK ME!</button>
      <br />
      <ChildComponent text={\`Button Click Count: \${clickCount}\`} />
      <ChildComponent2 isShowingNestedComponent={isShowingNestedComponent} />
      <CodeBlock code={code} />
    </>
  );
};`



const ChildComponent = ({ text }: { text: string }) => {
  return (
    <div style={{ background: "green" }}>
      This is the child component.
      <br />
      {text}
    </div>
  );
};

const ChildComponent2 = ({ isShowingNestedComponent }: { isShowingNestedComponent: boolean }) => {
  return (
    <div style={{ background: "blue" }}>
      This is the second child component.
      <br />
      {isShowingNestedComponent && <ChildComponent3 />}
    </div>
  );
};

const ChildComponent3 = () => {
  return (<div>This is child component 3</div>)
}

let isShowingNestedComponent = false;
export const PropsVsStateExample = () => {
  const [clickCount, setClickCount] = useState(0)
  return (
    <>
      Props vs State
      <br />
      <br />
      <button onClick={() => isShowingNestedComponent = !isShowingNestedComponent}>Toggle Nested Component</button>
      <br />
      <button onClick={() => setClickCount(clickCount + 1)}>CLICK ME!</button>
      <br />
      <ChildComponent text={`Button Click Count: ${clickCount}`} />
      <ChildComponent2 isShowingNestedComponent={isShowingNestedComponent} />
      <CodeBlock code={code} />
    </>
  );
};
