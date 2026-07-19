/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const defaultChecked = true;

import { Switch } from '@moduix/react';

export function InitialCheckedSwitchDemo() {
  return (
    <Switch defaultChecked>
      <Switch.Control />
      <Switch.Label>Start enabled</Switch.Label>
    </Switch>
  );
}

//#endregion