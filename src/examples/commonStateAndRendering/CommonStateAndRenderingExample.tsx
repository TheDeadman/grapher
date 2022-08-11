import React, { useState } from "react";
import { ProblematicExample } from "./ProblematicExample";
import { OptimizedExample } from "./OptimizedVersion";
import { Select, MenuItem } from "@mui/material";
import { match } from "assert/strict";
import { CompositionExample } from "./CompositionExample";
import { ReduxExample } from "./reduxExample/ReduxExample";


export const CommonStateAndRenderingExample = () => {
  const [exampleVersion, setExampleVersion] = useState('problematic');

  return (
    <>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={exampleVersion}
        label="Select an example"
        onChange={(e) => setExampleVersion(e.target.value)}
      >
        <MenuItem value={'problematic'}>Problematic</MenuItem>
        <MenuItem value={'composed'}>Composed</MenuItem>
        <MenuItem value={'redux'}>Redux</MenuItem>
      </Select>
      <br />
      {exampleVersion === 'problematic' && <ProblematicExample />}
      {exampleVersion === 'composed' && <CompositionExample />}
      {exampleVersion === 'redux' && <ReduxExample />}
    </>
  )
};
