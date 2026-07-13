/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const enabledLabel = 'Feature is enabled';
const disabledLabel = 'Feature is disabled';

import { Switch, useSwitchContext } from '@moduix/react';

function SwitchContextLabel() {
  const switchApi = useSwitchContext();

  return <Switch.Label>Feature is {switchApi.checked ? 'enabled' : 'disabled'}</Switch.Label>;
}

export function SwitchContextDemo() {
  return (
    <Switch defaultChecked>
      <Switch.Control />
      <SwitchContextLabel />
    </Switch>
  );
}

//#endregion