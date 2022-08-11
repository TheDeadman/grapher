import React, { useState } from "react";
import { ProblematicExample } from "./ProblematicExample";
import { OptimizedExample } from "./OptimizedVersion";


export const StateAndRenderingExample = () => {
  const [exampleVersion, setExampleVersion] = useState('problematic');

  return (
    <>
      <button onClick={() => exampleVersion === 'problematic' ? setExampleVersion('optimized') : setExampleVersion('problematic')}>{exampleVersion === 'problematic' ? 'Show optimized version' : 'Show problematic version'}</button>
      <br />
      {exampleVersion === 'problematic' && <ProblematicExample />}
      {exampleVersion === 'optimized' && <OptimizedExample />}
    </>
  )
};
