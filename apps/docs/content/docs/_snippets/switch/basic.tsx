/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const defaultChecked = true;
const label = 'Enable notifications';

import { Switch } from '@moduix/react';

export function SwitchDemo() {
  return (
    <Switch defaultChecked>
      <Switch.Control />
      <Switch.Label>Enable notifications</Switch.Label>
      <Switch.HiddenInput />
    </Switch>
  );
}

//#endregion