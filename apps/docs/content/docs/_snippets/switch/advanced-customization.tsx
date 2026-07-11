//#region demo
import { Switch } from '@moduix/react';

function PowerIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 2.5V7M5.1 4.3A5 5 0 1 0 10.9 4.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AdvancedCustomizationSwitchDemo() {
  return (
    <Switch defaultChecked>
      <Switch.Control>
        <Switch.Thumb>
          <PowerIcon />
        </Switch.Thumb>
      </Switch.Control>
      <Switch.Label>Use custom thumb icon</Switch.Label>
      <Switch.HiddenInput />
    </Switch>
  );
}
//#endregion demo