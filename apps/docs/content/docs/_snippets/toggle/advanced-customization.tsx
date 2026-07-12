/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Toggle, useToggleContext } from '@moduix/react';
import { Bell as BellIcon } from 'lucide-react';

function ToggleStateLabel() {
  const toggle = useToggleContext();

  return <span>{toggle.pressed ? 'Notifications on' : 'Notifications off'}</span>;
}

export function AdvancedToggleCustomizationDemo() {
  return (
    <Toggle defaultPressed>
      <BellIcon />
      <ToggleStateLabel />
    </Toggle>
  );
}

//#endregion